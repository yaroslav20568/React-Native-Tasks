import React, { useCallback, useEffect, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { s } from 'react-native-wind';
import uuid from 'react-native-uuid';
import { Notifier, Easing } from 'react-native-notifier';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Header, TodoAddForm, TodosList } from './src/components';
import { ITodo, IAddFormData } from './src/types';

const App = (): React.JSX.Element => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

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
        status: null,
        createdAt: new Date()
      };
      const newTodos = [...todos, createdTodo];

      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));

      Notifier.showNotification({
        title: `Todo added`,
        description: 'Check it out in the todos, manage todo list',
        duration: 3000,
        showAnimationDuration: 800,
        showEasing: Easing.ease,
        hideOnPress: true
      });
    },
    [todos]
  );

  const deleteTodo = useCallback(
    async (id: string): Promise<void> => {
      const newTodos = todos.filter(todo => todo.id !== id);

      setTodos(newTodos);
      await AsyncStorage.setItem('todos', JSON.stringify(newTodos));
    },
    [todos]
  );

  return (
    <SafeAreaView style={s`flex-1 bg-violet-100`}>
      <Header />
      <TodosList todos={todos} isLoaded={isLoaded} deleteTodo={deleteTodo} />
      <TodoAddForm addTodo={addTodo} />
    </SafeAreaView>
  );
};

export default App;
