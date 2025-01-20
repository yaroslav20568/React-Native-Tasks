import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home, TodoLog, Map } from '../screens';
import { TRootStackParamList } from '../types';
import { ScreenNames } from '../constants';

const Stack = createNativeStackNavigator<TRootStackParamList>();

const Stacks = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false, animation: 'slide_from_left' }}
      >
        <Stack.Screen name={ScreenNames.Home} component={Home} />
        <Stack.Screen name={ScreenNames.TodoLog} component={TodoLog} />
        <Stack.Screen name={ScreenNames.Map} component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
