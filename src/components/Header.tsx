import React from 'react';
import { View, Text, Switch } from 'react-native';
import { s } from 'react-native-wind';
import moment from 'moment';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import { useColorScheme } from '../hooks';
import { ColorSchemes, themeColors } from '../constants';

const Header = (): React.JSX.Element => {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <View
      style={[
        s`flex-row justify-between items-center bg-violet500-${colorScheme} py-6 px-4`,
        { boxShadow: '0 0 10 2 rgba(153, 102, 204, 1)' }
      ]}
    >
      <Text
        style={s`text-white-${colorScheme} text-xl font-semibold uppercase`}
      >
        Todos
      </Text>
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
      <Switch
        trackColor={{ false: '#767577', true: '#81b0ff' }}
        thumbColor={colorScheme === ColorSchemes.dark ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor='#3e3e3e'
        onValueChange={toggleColorScheme}
        value={colorScheme === ColorSchemes.dark ? true : false}
      />
    </View>
  );
};

export default Header;
