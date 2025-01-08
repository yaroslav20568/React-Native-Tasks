import { AppRegistry } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NotifierWrapper } from 'react-native-notifier';
import App from './App';
import { name as appName } from './app.json';

const ProvidedApp = () => {
  return (
    <GestureHandlerRootView>
      <NotifierWrapper>
        <App />
      </NotifierWrapper>
    </GestureHandlerRootView>
  );
};

AppRegistry.registerComponent(appName, () => ProvidedApp);
