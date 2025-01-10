import React, { useState, memo, useEffect, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Layout,
  FadeInLeft,
  FadeOutLeft
} from 'react-native-reanimated';
import { s } from 'react-native-wind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { ITodo, TTodoStatus } from '../../types';
import DropDownMenu from '../UI/DropDownMenu';
import { TodoStatus, todoStatusColors } from '../../constants';

interface IProps extends ITodo {
  index: number;
  deleteTodo: (id: string) => void;
  changeStatusTodo: (id: string, status: TTodoStatus) => void;
}

const Todo = ({
  id,
  title,
  description,
  executionAt,
  location,
  status,
  index,
  deleteTodo,
  changeStatusTodo
}: IProps): React.JSX.Element => {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState<boolean>(false);

  const onDeleteTodo = () => deleteTodo(id);

  const onChangeStatusTodo = useCallback((status: TTodoStatus) => {
    changeStatusTodo(id, status);
  }, []);

  const toggleOpenMoreInfo = () => {
    setMoreInfoIsOpen(prevState => !prevState);
  };

  return (
    <Animated.View
      layout={Layout.delay(500).duration(200)}
      entering={FadeInLeft.delay(500 * index).duration(500)}
      exiting={FadeOutLeft.duration(500)}
      style={s`${todoStatusColors[status]} py-4 px-3 rounded-2xl`}
    >
      <View style={s`flex-row items-center justify-between`}>
        <View>
          <Text style={s`text-base text-violet-500 font-medium mb-1`}>
            {title}
          </Text>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleOpenMoreInfo}
              style={s`self-start`}
            >
              <Text style={s`text-black font-medium mb-0.5`}>
                {!moreInfoIsOpen ? 'Open' : 'Close'} more information
              </Text>
            </TouchableOpacity>
            {moreInfoIsOpen && (
              <View
                style={[
                  s`absolute ${todoStatusColors[status]} flex-row z-10 w-full top-full`
                ]}
              >
                <Text style={s`text-black`}>{description}, </Text>
                <Text style={s`text-black`}>{location}</Text>
              </View>
            )}
          </View>
          <Text>{moment(executionAt).format('MMMM Do YYYY, HH:mm')}</Text>
        </View>
        <View style={s`flex-row items-center`}>
          <DropDownMenu
            defaultValue={status}
            items={Object.values(TodoStatus)}
            onPress={onChangeStatusTodo}
          />
          <TouchableOpacity onPress={onDeleteTodo} style={s`ml-6`}>
            <AntDesign name='delete' size={25} color='#000' />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default memo(Todo);
