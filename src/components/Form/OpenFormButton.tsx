import React from 'react';
import { TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Animated, { Easing, FadeInRight } from 'react-native-reanimated';
import { useColorScheme } from '../../hooks';
import { themeColors } from '../../constants';

interface IProps {
  toggleOpenForm: () => void;
  formIsOpen: boolean;
}

const AnimatedTouchableOpacity =
  Animated.createAnimatedComponent(TouchableOpacity);

const OpenFormButton = ({
  toggleOpenForm,
  formIsOpen
}: IProps): React.JSX.Element => {
  const { colorScheme } = useColorScheme();

  return (
    <AnimatedTouchableOpacity
      activeOpacity={0.7}
      style={[
        s`${
          formIsOpen ? 'top-8' : ''
        } absolute z-10 right-4 w-12 h-12 bg-violet500-${colorScheme} justify-center items-center rounded-full`,
        {
          boxShadow: `0 0 10 1 ${themeColors.violet500[colorScheme]}`,
          bottom: !formIsOpen ? -136 : 0
        }
      ]}
      onPress={toggleOpenForm}
      entering={FadeInRight.duration(600).easing(Easing.ease)}
    >
      <AntDesign
        name={!formIsOpen ? 'plus' : 'close'}
        size={35}
        color={themeColors.white[colorScheme]}
      />
    </AnimatedTouchableOpacity>
  );
};

export default OpenFormButton;
