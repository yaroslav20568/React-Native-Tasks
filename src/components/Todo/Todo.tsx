import React, { useState, memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Layout,
  FadeInLeft,
  FadeOutLeft
} from 'react-native-reanimated';
import { s } from 'react-native-wind';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import moment from 'moment';
import { ITodo } from '../../types';

interface IProps extends ITodo {
  index: number;
  deleteTodo: (id: string) => void;
}

const Todo = ({
  id,
  title,
  description,
  executionAt,
  index,
  deleteTodo
}: IProps): React.JSX.Element => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onDeleteTodo = () => deleteTodo(id);

  return (
    <Animated.View
      layout={Layout.delay(500).duration(200)}
      entering={FadeInLeft.delay(500 * index).duration(500)}
      exiting={FadeOutLeft.duration(500)}
      style={s`bg-white py-4 px-3 rounded-2xl`}
    >
      <View style={s`flex-row justify-between`}>
        <View style={{ width: '70%' }}>
          <Text style={s`text-base text-violet-500 font-medium mb-1`}>
            {title}
          </Text>
          <View>
            <TouchableOpacity
              onPress={() => setIsOpen(prevState => !prevState)}
            >
              <Text style={s`text-black font-medium mb-0.5`}>
                {!isOpen ? 'Open' : 'Close'} description
              </Text>
            </TouchableOpacity>
            {isOpen && (
              <View
                style={[
                  s`absolute bg-violet-500 z-10 width-full top-full px-2 rounded-sm`,
                  { width: '100%' }
                ]}
              >
                <Text style={s`text-white`}>{description}</Text>
              </View>
            )}
          </View>
          <Text>{moment(executionAt).format('MMMM Do YYYY, HH:mm')}</Text>
        </View>
        <View style={s`flex-row mt-2`}>
          <TouchableOpacity style={s`mr-4`}>
            <Entypo name='dots-three-horizontal' size={25} color='#000' />
          </TouchableOpacity>
          <TouchableOpacity onPress={onDeleteTodo}>
            <AntDesign name='delete' size={25} color='#ff0f0f' />
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

export default memo(Todo);
