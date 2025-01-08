import React, { useCallback, useState } from 'react';
import { SafeAreaView } from 'react-native';
import { s } from 'react-native-wind';
import uuid from 'react-native-uuid';
import { Notifier, Easing } from 'react-native-notifier';
import { Header, TodoAddForm } from './src/components';
import { ITodo, IAddFormData } from './src/types';

const App = (): React.JSX.Element => {
  const [todos, setTodos] = useState<Array<ITodo>>([]);

  const addTodo = useCallback(
    (todoFormValues: IAddFormData) => {
      const createdTodo: ITodo = {
        id: uuid.v4(),
        ...todoFormValues,
        status: null,
        createdAt: new Date()
      };

      setTodos([...todos, createdTodo]);

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
  return (
    <SafeAreaView style={s`flex-1 bg-violet-100`}>
      <Header />
      <TodoAddForm addTodo={addTodo} />
    </SafeAreaView>
  );
};

export default App;
