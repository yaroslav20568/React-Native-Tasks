import React from 'react';
import { View, Text } from 'react-native';
import { s } from 'react-native-wind';
import { TodoStatus, todoStatusColors } from '../../constants';

const TodosInfoStatuses = () => {
  return (
    <View style={s`flex-row py-5 px-4`}>
      <View style={s`items-center w-1/4 px-1`}>
        <Text style={s`mr-2 mb-1`}>Normal</Text>
        <View style={s`w-5/6 h-1 bg-white`}></View>
      </View>
      {Object.values(TodoStatus).map((todoStatus, index) => (
        <View style={s`items-center w-1/4 px-1`} key={`todoStatus_${index}`}>
          <Text style={s`mr-2 mb-1`}>{todoStatus}</Text>
          <View style={s`w-full h-1 ${todoStatusColors[todoStatus]}`}></View>
        </View>
      ))}
    </View>
  );
};

export default TodosInfoStatuses;
