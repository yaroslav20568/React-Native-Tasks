import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { s } from 'react-native-wind';
import uuid from 'react-native-uuid';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import moment from 'moment';
import {
  Header,
  SortBarTodos,
  TodoAddForm,
  TodosList,
  TodosInfoStatuses
} from '../components';
import { ITodo, TTodoStatus, IsortedParams } from '../types';
import { sortDateTodos, sortStatusTodos } from '../helpers';
import { useColorScheme } from '../hooks';
import { ColorSchemes } from '../constants';

const Home = (): React.JSX.Element => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sortedParams, setSortedParams] = useState<IsortedParams>({
    ascSortPubDate: true,
    ascSortStatus: true
  });
  const toast = useToast();
  const { colorScheme, setInitColorScheme } = useColorScheme();

  useEffect(() => {
    PushNotification.createChannel(
      {
        channelId: 'channel-app',
        channelName: 'channel-app',
        vibrate: true
      },
      () => {}
    );

    getDataFromStorage();
  }, []);

  const getDataFromStorage = async (): Promise<void> => {
    setIsLoaded(false);

    const stringTodos = (await AsyncStorage.getItem('todos')) || '[]';
    const stringSortedParams =
      (await AsyncStorage.getItem('sortedParams')) ||
      '{"ascSortPubDate": true, "ascSortStatus": true}';
    const colorScheme = ((await AsyncStorage.getItem('colorScheme')) ||
      'light') as keyof typeof ColorSchemes;

    const parseTodos: Array<ITodo> = JSON.parse(stringTodos);
    const parseSortedParams: IsortedParams = JSON.parse(stringSortedParams);

    const sortedTodos = sortTodos(parseTodos);

    setTodos(sortedTodos);
    setSortedParams(parseSortedParams);
    setInitColorScheme(colorScheme);
    setIsLoaded(true);
  };

  const addTodo = useCallback(
    async (
      todoFormValues: Pick<
        ITodo,
        'title' | 'description' | 'executionAt' | 'location' | 'file'
      >
    ): Promise<void> => {
      const createdTodo: ITodo = {
        id: uuid.v4(),
        ...todoFormValues,
        status: '',
        logActions: [{ name: 'Created on', timestamp: new Date() }],
        createdAt: new Date()
      };

      const newTodos = [...todos, createdTodo];

      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

      toast.show('Todo added. Check it out in the todos, manage todo list');

      PushNotification.localNotificationSchedule({
        id: createdTodo.id.split('-')[0].replace(/\D/g, ''),
        title: 'Scheduled task',
        message: `${createdTodo.title}. Today at ${moment(
          createdTodo.executionAt
        ).format('HH:mm')}`,
        smallIcon: 'ic_launcher_round',
        largeIcon: 'ic_launcher_round',
        channelId: 'channel-app',
        date: moment(createdTodo.executionAt).subtract(30, 'minutes').toDate()
      });
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<void> => {
      const newTodos = todos.filter(todo => todo.id !== id);

      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

      toast.show('Todo deleted. Check it out in the todos, manage todo list');

      PushNotification.cancelLocalNotification(
        id.split('-')[0].replace(/\D/g, '')
      );
    },
    [todos]
  );

  const changeStatusTodo = useCallback(
    async (id: string, status: TTodoStatus): Promise<void> => {
      let newTodos: Array<ITodo> = [];
      let isChanged = false;

      setTodos(prevTodos => {
        const actualTodos = prevTodos.map(todo => {
          if (todo.id === id) {
            if (todo.status !== status) {
              isChanged = true;

              todo.status = status;
              todo.logActions = [
                ...todo.logActions,
                {
                  name: `Changed status on ${status.toLowerCase()}`,
                  timestamp: new Date()
                }
              ];
            }
          }

          return todo;
        });

        newTodos = [...actualTodos];

        return actualTodos;
      });

      if (isChanged) {
        await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

        toast.show(
          'Todo changed status. Check it out in the todos, manage todo list'
        );
      }
    },
    [todos]
  );

  const toggleSortedParams = useCallback(
    (sortedParam: keyof IsortedParams): void => {
      setSortedParams(prevState => {
        const actualState = {
          ...prevState,
          [sortedParam]: !prevState[sortedParam]
        };

        AsyncStorage.setItem('sortedParams', JSON.stringify(actualState));

        return actualState;
      });
    },
    []
  );

  const sortTodos = (todos: Array<ITodo>) => {
    const sortedDateTodos = sortDateTodos(todos, sortedParams.ascSortPubDate);
    const sortedStatusTodos = sortStatusTodos(
      sortedDateTodos,
      sortedParams.ascSortStatus
    );

    return sortedStatusTodos;
  };

  const sortedTodos = useMemo(() => sortTodos(todos), [todos, sortedParams]);

  return (
    <SafeAreaView style={s`flex-1 bg-violet100-${colorScheme}`}>
      <Header title='Todos' />
      <SortBarTodos
        sortedParams={sortedParams}
        toggleSortedParams={toggleSortedParams}
      />
      <TodosInfoStatuses />
      <TodosList
        todos={sortedTodos}
        isLoaded={isLoaded}
        deleteTodo={deleteTodo}
        changeStatusTodo={changeStatusTodo}
      />
      <TodoAddForm addTodo={addTodo} />
    </SafeAreaView>
  );
};

export default Home;
