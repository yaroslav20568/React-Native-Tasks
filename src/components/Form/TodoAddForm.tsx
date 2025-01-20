import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  useWindowDimensions
} from 'react-native';
import { ScrollView } from 'react-native-virtualized-view';
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
import {
  OpenFormButton,
  CustomInputText,
  CustomDatePicker,
  CustomGooglePlacesAutocomplete,
  CustomImagePicker
} from '..';
import { IFile, ILocation, ITodo } from '../../types';
import { useColorScheme } from '../../hooks';
import { themeColors } from '../../constants';

interface IProps {
  addTodo: (
    addFormData: Pick<
      ITodo,
      'title' | 'description' | 'executionAt' | 'location' | 'file'
    >
  ) => void;
}

interface IAddFormData
  extends Pick<ITodo, 'title' | 'description' | 'executionAt'> {
  location: string;
}

const defaultLocation = {
  address: '',
  coords: {
    lat: 0,
    lng: 0
  }
};

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
        moment(new Date()).add(30, 'minutes'),
        `The execution time should be one day later, after ${moment(new Date())
          .add(30, 'minutes')
          .format('MMMM Do YYYY, HH:mm')}`
      ),
    location: yup.string().required('Enter and select from the list')
  })
  .required();

const TodoAddForm = ({ addTodo }: IProps): React.JSX.Element => {
  const [formIsOpen, setFormIsOpen] = useState<boolean>(false);
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [location, setLocation] = useState<ILocation>(defaultLocation);
  const [file, setFile] = useState<IFile | null>(null);
  const { control, handleSubmit, reset } = useForm<IAddFormData>({
    defaultValues: {
      title: '',
      description: '',
      executionAt: new Date(),
      location: ''
    },
    resolver: yupResolver(schema)
  });
  const { colorScheme } = useColorScheme();
  const { height } = useWindowDimensions();
  const translateY = useSharedValue<number>(-height);

  const todoAddFormStyles = useAnimatedStyle(() => ({
    height: `100%`,
    transform: [{ translateY: translateY.value }]
  }));

  useEffect(() => {
    if (formIsOpen) {
      translateY.value = withTiming(0);
    } else {
      translateY.value = withTiming(-height);
    }
  }, [formIsOpen, height]);

  const toggleOpenForm = (): void => {
    setFormIsOpen(prevState => !prevState);
  };

  const onAddTodo = (todoFormValues: IAddFormData) => {
    const transformFormValues: Pick<
      ITodo,
      'title' | 'description' | 'executionAt' | 'location' | 'file'
    > = { ...todoFormValues, location, file };

    addTodo(transformFormValues);
    reset();
    setCurrentDate(new Date());
    setLocation(defaultLocation);
    setFile(null);
    setTimeout(() => {
      setFormIsOpen(prevState => !prevState);
    }, 500);
  };

  return (
    <Animated.View
      style={[
        s`absolute t-0 bg-violet200-${colorScheme} w-full z-1`,
        todoAddFormStyles
      ]}
    >
      <OpenFormButton toggleOpenForm={toggleOpenForm} formIsOpen={formIsOpen} />
      <ScrollView keyboardShouldPersistTaps='handled'>
        <View style={s`pt-28 pb-6 px-4`}>
          <View style={s`mb-4`}>
            <CustomInputText
              control={control}
              name='title'
              placeholder='Task title'
              inputStyle={s`bg-violet400-${colorScheme} rounded-xl border-2 border-violet500-${colorScheme} text-white-${colorScheme} py-4 px-4`}
              errorTextStyle={s`text-red400-${colorScheme} mt-1 ml-5`}
              placeholderTextColor={themeColors.white[colorScheme]}
              selectionColor={themeColors.white[colorScheme]}
            />
          </View>
          <View style={s`mb-4`}>
            <CustomInputText
              control={control}
              name='description'
              placeholder='Task description'
              inputStyle={s`bg-violet400-${colorScheme} rounded-xl border-2 border-violet500-${colorScheme} text-white-${colorScheme} py-4 px-4`}
              errorTextStyle={s`text-red400-${colorScheme} mt-1 ml-5`}
              placeholderTextColor={themeColors.white[colorScheme]}
              selectionColor={themeColors.white[colorScheme]}
            />
          </View>
          <View style={s`mb-4`}>
            <CustomDatePicker
              control={control}
              name='executionAt'
              buttonStyle={s`flex-row items-center bg-violet400-${colorScheme} rounded-xl border-2 border-violet500-${colorScheme} text-white-${colorScheme} py-4 px-4`}
              errorTextStyle={s`text-red400-${colorScheme} mt-1 ml-5`}
              iconColor={themeColors.white[colorScheme]}
              textStyle={s`text-white-${colorScheme} ml-2`}
              currentDate={currentDate}
              setCurrentDate={setCurrentDate}
              theme={colorScheme}
            />
          </View>
          <View style={s`mb-4`}>
            <CustomGooglePlacesAutocomplete
              control={control}
              name='location'
              placeholder='Location'
              defaultLocation={defaultLocation}
              location={location}
              setLocation={setLocation}
              inputStyle={s`h-full bg-violet400-${colorScheme} rounded-xl border-2 border-violet500-${colorScheme} text-white-${colorScheme} py-4 pl-11 pr-11`}
              errorTextStyle={s`text-red400-${colorScheme} mt-1 ml-5`}
              iconColor={themeColors.white[colorScheme]}
              placeholderTextColor={themeColors.white[colorScheme]}
              selectionColor={themeColors.white[colorScheme]}
              listItemStyle={s`bg-violet400-${colorScheme}`}
              listItemTextStyle={s`text-white-${colorScheme}`}
            />
          </View>
          <View style={s`mb-2`}>
            <CustomImagePicker
              file={file}
              setFile={setFile}
              buttonStyle={s`flex-row items-center bg-violet400-${colorScheme} rounded-xl border-2 border-violet500-${colorScheme} text-white-${colorScheme} py-4 px-4`}
              iconColor={themeColors.white[colorScheme]}
              buttonTextStyle={s`text-white-${colorScheme} ml-2`}
              imageStyle={s`w-28 h-28`}
              clearButtonStyle={s`self-start bg-violet500-${colorScheme} rounded-full p-2 ml-4`}
              clearIconColor={themeColors.white[colorScheme]}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSubmit(onAddTodo)}
            style={s`bg-violet500-${colorScheme} rounded-xl py-3 px-6 mt-4`}
          >
            <Text
              style={s`text-center text-base text-white-${colorScheme} capitalize`}
            >
              Add todo
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

export default TodoAddForm;
