import React from 'react';
import { View, Text } from 'react-native';
import { s } from 'react-native-wind';
import { TodoStatus, todoStatusColors } from '../../constants';

const TodosInfoStatuses = () => {
  return (
    <View style={s`flex-row pt-5 pb-2`}>
      <View style={s`flex-grow items-center w-1/4 px-0.5`}>
        <Text style={s`text mb-1`}>Normal</Text>
        <View style={s`w-full h-1 bg-white`}></View>
      </View>
      {Object.values(TodoStatus).map((todoStatus, index) => (
        <View
          style={s`flex-grow items-center w-1/4 px-0.5`}
          key={`todoStatus_${index}`}
        >
          <Text style={s`mb-1`}>{todoStatus}</Text>
          <View style={s`w-full h-1 ${todoStatusColors[todoStatus]}`}></View>
        </View>
      ))}
    </View>
  );
};

export default TodosInfoStatuses;
