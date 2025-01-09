import React, { useState } from 'react';
import { Text } from 'react-native';
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
}

const DropDownMenu = ({ defaultValue, items, onPress }: IProps) => {
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
        <Entypo name='dots-three-horizontal' size={25} />
      </MenuTrigger>
      <MenuOptions customStyles={{ optionsContainer: { width: 85 } }}>
        {items.map((status, index) => (
          <MenuOption
            value={index}
            customStyles={{ optionWrapper: s`m-0 py-1` }}
            key={`menuOption_${index}`}
          >
            <Text
              style={s`${active === status ? 'text-violet-500' : 'text-black'}`}
            >
              {status}
            </Text>
          </MenuOption>
        ))}
      </MenuOptions>
    </Menu>
  );
};

export default DropDownMenu;
