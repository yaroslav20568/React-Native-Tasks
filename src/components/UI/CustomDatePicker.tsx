import React, { useState } from 'react';
import {
  ColorValue,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle
} from 'react-native';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ColorSchemes } from '../../constants';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  buttonStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  iconColor?: ColorValue;
  textStyle?: StyleProp<TextStyle>;
  currentDate: Date;
  setCurrentDate: (date: Date) => void;
  theme: keyof typeof ColorSchemes;
}

const CustomDatePicker = <T extends FieldValues>({
  control,
  name,
  buttonStyle,
  errorTextStyle,
  iconColor,
  textStyle,
  currentDate,
  setCurrentDate,
  theme
}: IProps<T>): React.JSX.Element => {
  const [openDatePicker, setOpenDatePicker] = useState<boolean>(false);

  const onCancel = (): void => {
    setOpenDatePicker(false);
  };

  const onOpen = (): void => {
    setOpenDatePicker(true);
  };

  return (
    <>
      <TouchableOpacity onPress={onOpen} style={buttonStyle}>
        <SimpleLineIcons name='calendar' size={18} color={iconColor} />
        <Text style={textStyle}>
          {moment(currentDate).format('MMMM Do YYYY, HH:mm')}
        </Text>
      </TouchableOpacity>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <DatePicker
              modal={true}
              locale='en'
              open={openDatePicker}
              date={currentDate}
              onConfirm={date => {
                setOpenDatePicker(false);
                setCurrentDate(date);
                onChange(date);
              }}
              onCancel={onCancel}
              title='Select date and time'
              theme={theme}
            />
            {error && <Text style={errorTextStyle}>{error.message}</Text>}
          </>
        )}
      />
    </>
  );
};

export default CustomDatePicker;
