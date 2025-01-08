import React from 'react';
import {
  TextInput,
  Text,
  StyleProp,
  TextStyle,
  ColorValue
} from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
  inputStyle?: StyleProp<TextStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  placeholderTextColor?: ColorValue | undefined;
}

const CustomInputText = <T extends FieldValues>({
  control,
  name,
  placeholder,
  inputStyle,
  errorTextStyle,
  placeholderTextColor
}: IProps<T>): React.JSX.Element => {
  return (
    <>
      <Controller
        control={control}
        name={name}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error }
        }) => (
          <>
            <TextInput
              placeholder={placeholder}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              disableFullscreenUI={true}
              style={inputStyle}
              placeholderTextColor={placeholderTextColor}
            />
            {error && <Text style={errorTextStyle}>{error.message}</Text>}
          </>
        )}
      />
    </>
  );
};

export default CustomInputText;