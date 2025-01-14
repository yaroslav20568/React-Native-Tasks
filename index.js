import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { ToastProvider } from 'react-native-toast-notifications';
import { MenuProvider } from 'react-native-popup-menu';
import App from './App';
import { name as appName } from './app.json';

const ProvidedApp = () => {
  return (
    <GestureHandlerRootView>
      <ToastProvider placement='top' duration={2000} animationDuration={500}>
        <MenuProvider>
          <App />
        </MenuProvider>
      </ToastProvider>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedApp);
