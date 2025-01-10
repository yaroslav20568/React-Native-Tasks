import React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { s } from 'react-native-wind';
import { ITodo, TTodoStatus } from '../../types';
import { Todo } from '../../components';

interface IProps {
  todos: Array<ITodo>;
  isLoaded: boolean;
  deleteTodo: (id: string) => void;
  changeStatusTodo: (id: string, status: TTodoStatus) => void;
}

const TodosList = ({
  todos,
  isLoaded,
  deleteTodo,
  changeStatusTodo
}: IProps): React.JSX.Element => {
  const itemSeparatorComponent = (): React.JSX.Element => (
    <View style={s`h-4`}></View>
  );
  const listEmptyComponent = (): React.JSX.Element =>
    isLoaded ? (
      <Text style={s`text-base font-medium`}>
        The todo-list is empty, fill it out.
      </Text>
    ) : (
      <ActivityIndicator size='large' color='#9966ccd9' />
    );

  return (
    <FlatList
      data={todos}
      renderItem={({ item, index }) => (
        <Todo
          {...item}
          index={index}
          deleteTodo={deleteTodo}
          changeStatusTodo={changeStatusTodo}
        />
      )}
      ItemSeparatorComponent={itemSeparatorComponent}
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={s`pt-2 pb-4 px-4`}
    />
  );
};

export default TodosList;
