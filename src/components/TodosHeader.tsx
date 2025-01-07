import React from 'react';
import { View, Text } from 'react-native';
import { s } from 'react-native-wind';
import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';

const TodosHeader = (): React.JSX.Element => {
  return (
    <View
      style={s`flex-row justify-between items-center bg-violet-400 py-6 px-4`}
    >
      <Text style={s`text-white text-xl uppercase`}>Todos</Text>
      <View style={s`flex-row items-center`}>
        <SimpleLineIcons name='calendar' size={30} color='#fff' />
        <Text style={s`text-white ml-3`}>{moment().format('MMM Do YY')}</Text>
      </View>
    </View>
  );
};

export default TodosHeader;
