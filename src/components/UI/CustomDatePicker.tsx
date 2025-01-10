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
import { s } from 'react-native-wind';
import moment from 'moment';
import DatePicker from 'react-native-date-picker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface IProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  buttonStyle?: StyleProp<ViewStyle>;
  errorTextStyle?: StyleProp<TextStyle>;
  iconColor?: ColorValue | undefined;
}

const CustomDatePicker = <T extends FieldValues>({
  control,
  name,
  buttonStyle,
  errorTextStyle,
  iconColor
}: IProps<T>): React.JSX.Element => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);

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
        <Text style={s`ml-3`}>
          {moment(currentDate).format('MMMM Do YYYY, HH:mm')}
        </Text>
      </TouchableOpacity>
      <Controller
        control={control}
        name={name}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <>
            <DatePicker
              modal
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
            />
            {error && <Text style={errorTextStyle}>{error.message}</Text>}
          </>
        )}
      />
    </>
  );
};

export default CustomDatePicker;
