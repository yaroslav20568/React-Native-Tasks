import React from 'react';
import { SafeAreaView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { s } from 'react-native-wind';
import { TRootStackParamList } from '../types';
import { ScreenNames } from '../constants';
import { Header, TodoLogList } from '../components';
import { useColorScheme } from '../hooks';

interface IProps
  extends NativeStackScreenProps<TRootStackParamList, ScreenNames.TodoLog> {}

const TodoLog = ({ navigation, route }: IProps): React.JSX.Element => {
  const { colorScheme } = useColorScheme();

  const onNavigateToBack = (): void => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={s`flex-1 bg-violet100-${colorScheme}`}>
      <Header title='Todo log' onNavigateToBack={onNavigateToBack} />
      <TodoLogList {...route.params} />
    </SafeAreaView>
  );
};

export default TodoLog;
