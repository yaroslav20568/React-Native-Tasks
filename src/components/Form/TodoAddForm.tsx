import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { useForm } from 'react-hook-form';
import moment from 'moment';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { OpenFormButton, CustomInputText } from '..';
import { IAddFormData } from '../../types';
import CustomDatePicker from '../UI/CustomDatePicker';

interface IProps {
  addTodo: (addFormData: IAddFormData) => void;
}

const schema = yup
  .object({
    title: yup.string().required('Required').min(4, 'Short, from 4 characters'),
    description: yup
      .string()
      .required('Required')
      .min(4, 'Short, from 4 characters'),
    executionAt: yup
      .date()
      .required('Required')
      .min(
        moment(new Date()).add(1, 'day'),
        `The execution time should be one day later, after ${moment(new Date())
          .add(1, 'day')
          .format('MMMM Do YYYY, HH:mm')}`
      ),
    location: yup
      .string()
      .required('Required')
      .min(4, 'Short, from 4 characters')
  })
  .required();

const TodoAddForm = ({ addTodo }: IProps): React.JSX.Element => {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const { control, handleSubmit, reset } = useForm<IAddFormData>({
    defaultValues: {
      title: '',
      description: '',
      executionAt: new Date(),
      location: ''
    },
    resolver: yupResolver(schema)
  });
  const heightAnimationValue = useSharedValue<number>(0);

  const todoAddFormStyles = useAnimatedStyle(() => ({
    height: `${heightAnimationValue.value}%`
  }));

  useEffect(() => {
    if (formIsOpen) {
      heightAnimationValue.value = withTiming(100);
    } else {
      heightAnimationValue.value = withTiming(0);
    }
  }, [formIsOpen]);

  const toggleOpenForm = (): void => {
    setFormIsOpen(prevValue => !prevValue);
  };

  const onAddTodo = (todoFormValues: IAddFormData) => {
    addTodo(todoFormValues);
    reset();
    setTimeout(() => {
      setFormIsOpen(prevValue => !prevValue);
    }, 500);
  };

  return (
    <Animated.View
      style={[s`absolute bottom-0 bg-violet-200 w-full z-1`, todoAddFormStyles]}
    >
      <OpenFormButton toggleOpenForm={toggleOpenForm} formIsOpen={formIsOpen} />
      <ScrollView>
        <View style={s`pt-28 pb-6 px-4`}>
          <View style={s`mb-4`}>
            <CustomInputText
              control={control}
              name='title'
              placeholder='Task title'
              inputStyle={s`bg-violet-400 rounded-xl border-2 border-violet-500 py-4 px-4`}
              errorTextStyle={s`text-red-400 mt-1 ml-5`}
              placeholderTextColor='#000'
            />
          </View>
          <View style={s`mb-4`}>
            <CustomInputText
              control={control}
              name='description'
              placeholder='Task description'
              inputStyle={s`bg-violet-400 rounded-xl border-2 border-violet-500 py-4 px-4`}
              errorTextStyle={s`text-red-400 mt-1 ml-5`}
              placeholderTextColor='#000'
            />
          </View>
          <View style={s`mb-4`}>
            <CustomDatePicker
              control={control}
              name='executionAt'
              buttonStyle={s`flex-row items-center bg-violet-400 rounded-xl border-2 border-violet-500 py-4 px-4`}
              errorTextStyle={s`text-red-400 mt-1 ml-5`}
              iconColor='#000'
            />
          </View>
          <View style={s`mb-4`}>
            <CustomInputText
              control={control}
              name='location'
              placeholder='Location'
              inputStyle={s`bg-violet-400 rounded-xl border-2 border-violet-500 py-4 px-4`}
              errorTextStyle={s`text-red-400 mt-1 ml-5`}
              placeholderTextColor='#000'
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmit(onAddTodo)}
            style={s`bg-violet-500 rounded-xl py-3 px-6 mt-4`}
          >
            <Text style={s`text-center text-base text-white capitalize`}>
              Add todo
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default TodoAddForm;
