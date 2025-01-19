import React from 'react';
import { View, Text } from 'react-native';
import { s } from 'react-native-wind';
import moment from 'moment';
import { ILogAction } from '../../types';
import { useColorScheme } from '../../hooks';

interface IProps extends ILogAction {}

const TodoLogItem = ({ name, timestamp }: IProps) => {
  const { colorScheme } = useColorScheme();

  return (
    <View style={s`bg-violet400-${colorScheme} py-4 px-3 rounded-2xl`}>
      <Text style={s`text-base text-white-${colorScheme} font-medium mb-1`}>
        {name}
      </Text>
      <Text style={s`text-white-${colorScheme}`}>
        {moment(timestamp).format('MMMM Do YYYY, HH:mm')}
      </Text>
    </View>
  );
};

export default TodoLogItem;
