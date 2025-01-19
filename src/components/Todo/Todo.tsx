import React, { useState, memo, useCallback } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, {
  Layout,
  FadeInLeft,
  FadeOutLeft
} from 'react-native-reanimated';
import { s } from 'react-native-wind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Fontisto from 'react-native-vector-icons/Fontisto';
import moment from 'moment';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ITodo, TRootStackParamList, TTodoStatus } from '../../types';
import DropDownMenu from '../UI/DropDownMenu';
import {
  ScreenNames,
  themeColors,
  TodoStatus,
  todoStatusColors
} from '../../constants';
import { useColorScheme } from '../../hooks';

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
  logActions,
  index,
  deleteTodo,
  changeStatusTodo
}: IProps): React.JSX.Element => {
  const [moreInfoIsOpen, setMoreInfoIsOpen] = useState<boolean>(false);
  const { colorScheme } = useColorScheme();
  const navigation = useNavigation<NavigationProp<TRootStackParamList>>();

  const onDeleteTodo = () => deleteTodo(id);

  const onChangeStatusTodo = useCallback((status: TTodoStatus): void => {
    changeStatusTodo(id, status);
  }, []);

  const toggleOpenMoreInfo = (): void => {
    setMoreInfoIsOpen(prevState => !prevState);
  };

  const onNavigateToTodoLog = (): void => {
    navigation.navigate(ScreenNames.TodoLog, {
      todoTitle: title,
      todoLogActions: logActions
    });
  };

  return (
    <Animated.View
      layout={Layout.duration(200)}
      entering={FadeInLeft.delay(500 * index).duration(500)}
      exiting={FadeOutLeft.duration(500)}
      style={s`${todoStatusColors[status]}-${colorScheme} py-4 px-3 rounded-2xl`}
    >
      <View style={s`flex-row items-center justify-between`}>
        <View>
          <Text
            style={s`text-base text-violet500_1-${colorScheme} font-medium mb-1`}
          >
            {title}
          </Text>
          <View>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={toggleOpenMoreInfo}
              style={s`self-start`}
            >
              <Text style={s`text-gray-${colorScheme} font-medium mb-0.5`}>
                {!moreInfoIsOpen ? 'Open' : 'Close'} more information
              </Text>
            </TouchableOpacity>
            {moreInfoIsOpen && (
              <View
                style={[
                  s`absolute ${todoStatusColors[status]}-${colorScheme} flex-row z-10 w-full top-full`
                ]}
              >
                <Text style={s`text-gray-${colorScheme}`}>{description}, </Text>
                <Text style={s`text-gray-${colorScheme}`}>{location}</Text>
              </View>
            )}
          </View>
          <Text style={s`text-gray-${colorScheme}`}>
            {moment(executionAt).format('MMMM Do YYYY, HH:mm')}
          </Text>
        </View>
        <View>
          <View style={s`flex-row items-center mb-1`}>
            <DropDownMenu
              defaultValue={status}
              items={Object.values(TodoStatus)}
              onPress={onChangeStatusTodo}
              iconColor={themeColors.gray[colorScheme]}
              backgroundColor={themeColors.white_1[colorScheme]}
              activeTextStyle={s`text-violet500_1-${colorScheme}`}
              textStyle={s`text-gray-${colorScheme}`}
            />
            <TouchableOpacity onPress={onDeleteTodo} style={s`ml-6`}>
              <AntDesign
                name='delete'
                size={25}
                color={themeColors.gray[colorScheme]}
              />
            </TouchableOpacity>
          </View>
          <View style={s`flex-row items-center`}>
            <TouchableOpacity onPress={onNavigateToTodoLog}>
              <Fontisto
                name='history'
                size={25}
                color={themeColors.gray[colorScheme]}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  );
};

export default memo(Todo);
