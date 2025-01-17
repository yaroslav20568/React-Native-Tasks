import { createContext } from 'react';
import { ColorSchemes } from '../constants';

interface IThemeContext {
  colorScheme: keyof typeof ColorSchemes;
  setInitColorScheme: (colorScheme: keyof typeof ColorSchemes) => void;
  toggleColorScheme: () => void;
}

const ThemeContext = createContext<IThemeContext>({
  colorScheme: ColorSchemes.light,
  setInitColorScheme: () => {},
  toggleColorScheme() {}
});

export default ThemeContext;
