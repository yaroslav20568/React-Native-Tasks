import React from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import { s } from 'react-native-wind';
import { ITodo } from '../../types';
import { Todo } from '../../components';

interface IProps {
  todos: Array<ITodo>;
  isLoaded: boolean;
  deleteTodo: (id: string) => void;
}

const TodosList = ({
  todos,
  isLoaded,
  deleteTodo
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
        <Todo {...item} index={index} deleteTodo={deleteTodo} />
      )}
      ItemSeparatorComponent={itemSeparatorComponent}
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={s`py-6 px-4`}
    />
  );
};

export default TodosList;
