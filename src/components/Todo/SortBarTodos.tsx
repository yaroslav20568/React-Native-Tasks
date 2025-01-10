import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { s } from 'react-native-wind';
import { IsortedParams } from '../../types';

interface IProps {
  sortedParams: IsortedParams;
  toggleSortedParams: (sortedParam: keyof IsortedParams) => void;
}

const SortBarTodos = ({ sortedParams, toggleSortedParams }: IProps) => {
  return (
    <View style={s`pt-4 px-4 flex-row`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => toggleSortedParams('ascSortPubDate')}
        style={s`flex-row items-center bg-violet-500 py-1 px-2 rounded-md mr-2`}
      >
        <Text style={s`text-white font-bold mr-2`}>
          Date created {sortedParams.ascSortPubDate ? 'ASC' : 'DESC'}
        </Text>
        <Entypo
          name={
            sortedParams.ascSortPubDate
              ? 'chevron-thin-down'
              : 'chevron-thin-up'
          }
          size={15}
          color='#fff'
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={() => toggleSortedParams('ascSortStatus')}
        style={s`flex-row items-center bg-violet-500 py-1 px-2 rounded-md`}
      >
        <Text style={s`text-white font-bold mr-2`}>
          Status {sortedParams.ascSortStatus ? 'ASC' : 'DESC'}
        </Text>
        <Entypo
          name={
            sortedParams.ascSortStatus ? 'chevron-thin-down' : 'chevron-thin-up'
          }
          size={15}
          color='#fff'
        />
      </TouchableOpacity>
    </View>
  );
};

export default SortBarTodos;
