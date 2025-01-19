import React from 'react';
import { View, FlatList, Text } from 'react-native';
import { s } from 'react-native-wind';
import { ITodo, TRootStackParamList } from '../../types';
import { TodoLogItem } from '../../components';
import { ScreenNames } from '../../constants';

interface IProps
  extends Pick<
    TRootStackParamList[ScreenNames.TodoLog],
    'todoTitle' | 'todoLogActions'
  > {}

const TodoLogList = ({
  todoTitle,
  todoLogActions
}: IProps): React.JSX.Element => {
  const itemSeparatorComponent = (): React.JSX.Element => (
    <View style={s`h-4`}></View>
  );

  const ListHeaderComponent = () => (
    <Text style={s`text-lg font-medium mb-1`}>Todo: {todoTitle}</Text>
  );

  const listEmptyComponent = (): React.JSX.Element => (
    <Text style={s`text-base font-medium`}>
      The todo-list is empty, fill it out.
    </Text>
  );

  return (
    <FlatList
      data={todoLogActions}
      renderItem={({ item }) => <TodoLogItem {...item} />}
      ItemSeparatorComponent={itemSeparatorComponent}
      ListHeaderComponent={ListHeaderComponent}
      ListEmptyComponent={listEmptyComponent}
      contentContainerStyle={s`py-4 px-4`}
    />
  );
};

export default TodoLogList;
