import React, { useState } from 'react';
import { ColorValue, StyleProp, Text, TextStyle } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import { s } from 'react-native-wind';
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger
} from 'react-native-popup-menu';
import { TTodoStatus } from '../../types';

interface IProps {
  defaultValue: string | null;
  items: Array<TTodoStatus>;
  onPress: (status: TTodoStatus) => void;
  iconColor?: ColorValue;
  backgroundColor?: ColorValue;
  activeTextStyle?: StyleProp<TextStyle>;
  textStyle?: StyleProp<TextStyle>;
}

const DropDownMenu = ({
  defaultValue,
  items,
  onPress,
  iconColor,
  backgroundColor,
  activeTextStyle,
  textStyle
}: IProps) => {
  const [active, setActive] = useState<string | null>(defaultValue);

  return (
    <Menu
      onSelect={value => {
        setActive(items[value]);
        onPress(items[value]);
      }}
      style={{ width: 25 }}
    >
      <MenuTrigger>
        <Entypo name='dots-three-horizontal' size={25} color={iconColor} />
      </MenuTrigger>
      <MenuOptions
        customStyles={{
          optionsContainer: { width: 85, backgroundColor }
        }}
      >
        {items.map((status, index) => (
          <MenuOption
            value={index}
            customStyles={{ optionWrapper: s`m-0 py-1` }}
            key={`menuOption_${index}`}
          >
            <Text style={active === status ? activeTextStyle : textStyle}>
              {status}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default DropDownMenu;
