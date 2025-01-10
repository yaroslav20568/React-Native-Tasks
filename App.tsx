import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { s } from 'react-native-wind';
import uuid from 'react-native-uuid';
import { useToast } from 'react-native-toast-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, SortBarTodos, TodoAddForm, TodosList } from './src/components';
import { ITodo, IAddFormData, TTodoStatus } from './src/types';
import { sortDateTodos, sortStatusTodos } from './src/helpers';

const App = (): React.JSX.Element => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [ascSortPubDate, setAscSortPubDate] = useState<boolean>(true);
  const [ascSortStatus, setAscSortStatus] = useState<boolean>(true);
  const toast = useToast();

  useEffect(() => {
    getTodosFromStorage();
  }, []);

  const getTodosFromStorage = async (): Promise<void> => {
    setIsLoaded(false);

    const stringTodos = (await AsyncStorage.getItem('todos')) || '[]';
    const parseTodos: Array<ITodo> = JSON.parse(stringTodos);

    setTodos(parseTodos);
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
      console.log(createdTodo);
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

  const toggleAscSortPubDate = useCallback(() => {
    setAscSortPubDate(prevState => !prevState);
  }, []);

  const toggleAscSortStatus = useCallback(() => {
    setAscSortStatus(prevState => !prevState);
  }, []);

  const sortTodos = () => {
    const sortedDateTodos = sortDateTodos(todos, ascSortPubDate);
    const sortedStatusTodos = sortStatusTodos(sortedDateTodos, ascSortStatus);

    return sortedStatusTodos;
  };

  const sortedTodos = useMemo(
    () => sortTodos(),
    [todos, ascSortPubDate, ascSortStatus]
  );

  return (
    <SafeAreaView style={s`flex-1 bg-violet-100`}>
      <Header />
      <SortBarTodos
        ascSortPubDate={ascSortPubDate}
        toggleAscSortPubDate={toggleAscSortPubDate}
        ascSortStatus={ascSortStatus}
        toggleAscSortStatus={toggleAscSortStatus}
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
