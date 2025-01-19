import React from 'react';
import { ToastProvider } from 'react-native-toast-notifications';
import { MenuProvider } from 'react-native-popup-menu';
import './src/configs/wind.config';
import { ThemeProvider } from './src/providers';
import Stacks from './src/navigation/Stacks';

const App = (): React.JSX.Element => {
  return (
    <ToastProvider
      normalColor='gray'
      placement='top'
      duration={2000}
      animationDuration={500}
    >
      <MenuProvider>
        <ThemeProvider>
          <Stacks />
        </ThemeProvider>
      </MenuProvider>
    </ToastProvider>
  );
};

export default App;
