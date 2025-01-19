import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { s } from 'react-native-wind';
import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import Feather from 'react-native-vector-icons/Feather';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useColorScheme } from '../../hooks';
import { ColorSchemes, themeColors } from '../../constants';

interface IProps {
  title: string;
  onNavigateToBack?: () => void;
}

const Header = ({ title, onNavigateToBack }: IProps): React.JSX.Element => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View
      style={[
        s`flex-row justify-between items-center bg-violet500-${colorScheme} py-6 px-4`,
        { boxShadow: `0 0 10 2 ${themeColors.violet500[colorScheme]}` }
      ]}
    >
      <Text
        style={s`text-white-${colorScheme} text-xl font-semibold uppercase`}
      >
        {title}
      </Text>
      {!onNavigateToBack && (
        <View style={s`flex-row items-center`}>
          <SimpleLineIcons
            name='calendar'
            size={30}
            color={themeColors.white[colorScheme]}
          />
          <Text style={s`text-white-${colorScheme} ml-3`}>
            {moment().format('MMM Do YY')}
          </Text>
        </View>
      )}
      <View style={s`flex-row items-center`}>
        <TouchableOpacity activeOpacity={0.7} onPress={toggleColorScheme}>
          <Feather
            name={colorScheme === ColorSchemes.light ? 'sun' : 'moon'}
            size={30}
            color={themeColors.white[colorScheme]}
          />
        </TouchableOpacity>
        {onNavigateToBack && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={onNavigateToBack}
            style={s`ml-4`}
          >
            <AntDesign
              name='back'
              size={30}
              color={themeColors.white[colorScheme]}
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Header;
