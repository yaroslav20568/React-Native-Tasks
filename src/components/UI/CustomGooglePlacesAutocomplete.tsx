import React, { useEffect, useRef, useState } from 'react';
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle
} from 'react-native';
import {
  GooglePlaceData,
  GooglePlaceDetail,
  GooglePlacesAutocomplete,
  GooglePlacesAutocompleteRef
} from 'react-native-google-places-autocomplete';
import 'react-native-get-random-values';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { s } from 'react-native-wind';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { GOOGLE_API_KEY } from '@env';
import { ILocation } from '../../types';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  defaultLocation: ILocation;
  location: ILocation;
  setLocation: (location: ILocation) => void;
  inputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  iconColor?: ColorValue;
  placeholderTextColor?: ColorValue;
  selectionColor?: ColorValue;
  listItemStyle?: StyleProp<ViewStyle>;
  listItemTextStyle?: StyleProp<TextStyle>;
}

const CustomGooglePlacesAutocomplete = <T extends FieldValues>({
  control,
  name,
  placeholder,
  defaultLocation,
  location,
  setLocation,
  inputStyle,
  errorTextStyle,
  iconColor,
  placeholderTextColor,
  selectionColor,
  listItemStyle,
  listItemTextStyle
}: IProps<T>) => {
  const ref = useRef<GooglePlacesAutocompleteRef | null>(null);
  const [enterLocation, setEnterLocation] = useState<string>('');

  useEffect(() => {
    ref.current?.setAddressText(location.address);
  }, []);

  const onSelectPlace = (
    data: GooglePlaceData,
    details: GooglePlaceDetail | null,
    onChange: (value: string) => void
  ): void => {
    const location = {
      address: data.description,
      coords: {
        lat: details?.geometry.location.lat,
        lng: details?.geometry.location.lng
      }
    } as ILocation;

    setLocation(location);
    onChange(location.address);
  };

  const renderLocationIcon = (): JSX.Element => {
    return (
      <View style={s`absolute top-4 left-4 z-10`}>
        <FontAwesome5 name='map-marked-alt' size={18} color={iconColor} />
      </View>
    );
  };

  const renderClearIcon = (onChange: (value: string) => void): JSX.Element => {
    return (
      <>
        {(location.address || enterLocation) && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              ref.current?.setAddressText('');
              setLocation(defaultLocation);
              onChange('');
            }}
            style={s`absolute top-4 right-4 z-10`}
          >
            <MaterialIcons name='clear' size={18} color={iconColor} />
          </TouchableOpacity>
        )}
      </>
    );
  };

  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <GooglePlacesAutocomplete
              ref={ref}
              placeholder={placeholder}
              fetchDetails={true}
              renderLeftButton={renderLocationIcon}
              renderRightButton={() => renderClearIcon(onChange)}
              textInputProps={{
                placeholderTextColor,
                cursorColor: selectionColor,
                disableFullscreenUI: true,
                editable: location.address ? false : true,
                onChangeText: text => setEnterLocation(text)
              }}
              styles={{
                textInputContainer: {
                  height: 55
                },
                textInput: inputStyle,
                poweredContainer: {
                  display: 'none'
                },
                listView: {
                  margin: 0
                },
                row: listItemStyle,
                description: listItemTextStyle
              }}
              onPress={(data, details) =>
                onSelectPlace(data, details, onChange)
              }
              query={{
                key: GOOGLE_API_KEY,
                language: 'en'
              }}
            />
            {error && <Text style={errorTextStyle}>{error.message}</Text>}
          </>
        )}
      />
    </>
  );
};

export default CustomGooglePlacesAutocomplete;
