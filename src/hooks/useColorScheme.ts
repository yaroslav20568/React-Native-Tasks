import { useContext } from 'react';
import { ThemeContext } from '../contexts';

const useColorScheme = () => useContext(ThemeContext);

export default useColorScheme;
