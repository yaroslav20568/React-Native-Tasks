import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { s } from 'react-native-wind';

interface IProps {
  ascSortPubDate: boolean;
  toggleAscSortPubDate: () => void;
  ascSortStatus: boolean;
  toggleAscSortStatus: () => void;
}

const SortBarTodos = ({
  ascSortPubDate,
  toggleAscSortPubDate,
  ascSortStatus,
  toggleAscSortStatus
}: IProps) => {
  return (
    <View style={s`pt-4 px-4 flex-row`}>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAscSortPubDate}
        style={s`flex-row items-center bg-violet-500 py-1 px-2 rounded-md mr-2`}
      >
        <Text style={s`text-white font-bold mr-2`}>
          Date created {ascSortPubDate ? 'ASC' : 'DESC'}
        </Text>
        <Entypo
          name={ascSortPubDate ? 'chevron-thin-down' : 'chevron-thin-up'}
          size={15}
          color='#fff'
        />
      </TouchableOpacity>
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={toggleAscSortStatus}
        style={s`flex-row items-center bg-violet-500 py-1 px-2 rounded-md`}
      >
        <Text style={s`text-white font-bold mr-2`}>
          Status {ascSortStatus ? 'ASC' : 'DESC'}
        </Text>
        <Entypo
          name={ascSortStatus ? 'chevron-thin-down' : 'chevron-thin-up'}
          size={15}
          color='#fff'
        />
      </TouchableOpacity>
    </View>
  );
};

export default SortBarTodos;
