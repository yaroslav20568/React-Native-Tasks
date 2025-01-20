import React from 'react';
import { SafeAreaView } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TRootStackParamList } from '../types';
import { ColorSchemes, ScreenNames, themeColors } from '../constants';
import { useColorScheme } from '../hooks';
import { Header } from '../components';

interface IProps
  extends NativeStackScreenProps<TRootStackParamList, ScreenNames.Map> {}

const Map = ({ navigation, route }: IProps) => {
  const { colorScheme } = useColorScheme();

  const onNavigateToBack = (): void => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header title='Map' onNavigateToBack={onNavigateToBack} />
      <MapView
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
        loadingEnabled={true}
        loadingIndicatorColor='#9966ccd9'
        loadingBackgroundColor={themeColors.violet100[colorScheme]}
        customMapStyle={
          colorScheme === ColorSchemes.light
            ? require('../assets/map-themes/lightTheme.json')
            : require('../assets/map-themes/darkTheme.json')
        }
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

export default Map;
