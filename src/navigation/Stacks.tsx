import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { Home } from '../screens';
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Stacks;
