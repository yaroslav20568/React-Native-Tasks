import React, { useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ColorSchemes } from '../constants';
import { ThemeContext } from '../contexts';

interface IProps {
  children: React.JSX.Element;
}

const ThemeProvider = ({ children }: IProps) => {
  const [colorScheme, setColorScheme] = useState<keyof typeof ColorSchemes>(
    ColorSchemes.light
  );

  const toggleColorScheme = (): void => {
    if (colorScheme === ColorSchemes.light) {
      setColorScheme(ColorSchemes.dark);
      AsyncStorage.setItem('colorScheme', ColorSchemes.dark);
    } else {
      setColorScheme(ColorSchemes.light);
      AsyncStorage.setItem('colorScheme', ColorSchemes.light);
    }
  };

  return (
    <ThemeContext.Provider
      value={{
        colorScheme,
        setInitColorScheme: setColorScheme,
        toggleColorScheme
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
