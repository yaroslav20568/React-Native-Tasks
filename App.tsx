import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { s } from 'react-native-wind';
import uuid from 'react-native-uuid';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, SortBarTodos, TodoAddForm, TodosList } from './src/components';
import { ITodo, IAddFormData, TTodoStatus, IsortedParams } from './src/types';
import { sortDateTodos, sortStatusTodos } from './src/helpers';

const App = (): React.JSX.Element => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [sortedParams, setSortedParams] = useState<IsortedParams>({
    ascSortPubDate: true,
    ascSortStatus: true
  });
  const toast = useToast();

  useEffect(() => {
    getDataFromStorage();
  }, []);

  const getDataFromStorage = async (): Promise<void> => {
    setIsLoaded(false);

    const stringTodos = (await AsyncStorage.getItem('todos')) || '[]';
    const stringSortedParams =
      (await AsyncStorage.getItem('sortedParams')) ||
      '{"ascSortPubDate": true, "ascSortStatus": true}';

    const parseTodos: Array<ITodo> = JSON.parse(stringTodos);
    const parseSortedParams: IsortedParams = JSON.parse(stringSortedParams);

    const sortedTodos = sortTodos(parseTodos);

    setSortedParams(parseSortedParams);
    setTodos(sortedTodos);
    setIsLoaded(true);
  };

  const addTodo = useCallback(
    async (todoFormValues: IAddFormData): Promise<void> => {
      const createdTodo: ITodo = {
        id: uuid.v4(),
        ...todoFormValues,
        status: '',
        createdAt: new Date()
      };

      const newTodos = [...todos, createdTodo];

      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

      toast.show('Todo added. Check it out in the todos, manage todo list');
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<void> => {
      const newTodos = todos.filter(todo => todo.id !== id);

      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

      toast.show('Todo deleted. Check it out in the todos, manage todo list');
    },
    [todos]
  );

  const changeStatusTodo = useCallback(
    async (id: string, status: TTodoStatus): Promise<void> => {
      let newTodos: Array<ITodo> = [];

      setTodos(prevTodos => {
        const actualTodos = prevTodos.map(todo => {
          if (todo.id === id) todo.status = status;
          return todo;
        });

        newTodos = [...actualTodos];

        return actualTodos;
      });
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

      toast.show(
        'Todo changed status. Check it out in the todos, manage todo list'
      );
    },
    [todos]
  );

  const toggleSortedParams = useCallback((sortedParam: keyof IsortedParams) => {
    setSortedParams(prevState => {
      const actualState = {
        ...prevState,
        [sortedParam]: !prevState[sortedParam]
      };

      AsyncStorage.setItem('sortedParams', JSON.stringify(actualState));

      return actualState;
    });
  }, []);

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
    <SafeAreaView style={s`flex-1 bg-violet-100`}>
      <Header />
      <SortBarTodos
        sortedParams={sortedParams}
        toggleSortedParams={toggleSortedParams}
      />
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

export default App;
