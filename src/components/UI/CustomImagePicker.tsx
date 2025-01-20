import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  Image,
  StyleProp,
  ViewStyle,
  TextStyle,
  ColorValue,
  ImageStyle
} from 'react-native';
import { s } from 'react-native-wind';
import { useToast } from 'react-native-toast-notifications';
import FilePickerManager from 'react-native-file-picker';
import Feather from 'react-native-vector-icons/Feather';
import { IFile } from '../../types';
import { openFile } from '../../helpers';

interface IProps {
  file: IFile | null;
  setFile: (file: IFile | null) => void;
  buttonStyle?: StyleProp<ViewStyle>;
  iconColor?: ColorValue;
  buttonTextStyle?: StyleProp<TextStyle>;
  infoTextStyle?: StyleProp<TextStyle>;
  imageStyle?: StyleProp<ImageStyle>;
  clearButtonStyle?: StyleProp<ViewStyle>;
  clearIconColor?: ColorValue;
}

const CustomImagePicker = ({
  file,
  setFile,
  buttonStyle,
  iconColor,
  buttonTextStyle,
  infoTextStyle,
  imageStyle,
  clearButtonStyle,
  clearIconColor
}: IProps) => {
  const toast = useToast();

  const isImageOrVideo = (type: string | undefined) => {
    if (type?.includes('image/') || type?.includes('video/')) {
      return true;
    }

    return false;
  };

  const chooseFile = () => {
    FilePickerManager.showFilePicker(response => {
      if (response.didCancel) {
        toast.show('Cancelled file picker');
      } else if (response.error) {
        toast.show(response.error.toString());
      } else {
        setFile({
          name: response.fileName,
          type: response.type,
          uri:
            Platform.OS === 'android'
              ? response.uri
              : response.uri.replace('file://', '')
        });
      }
    });
  };

  const resetFile = () => {
    setFile(null);
  };

  const viewFile = () => file && openFile(file.uri, toast);

  return (
    <>
      <TouchableOpacity
        style={buttonStyle}
        onPress={chooseFile}
        activeOpacity={0.7}
      >
        <Feather name='download' size={22} color={iconColor} />
        <Text style={buttonTextStyle}>Upload a file</Text>
      </TouchableOpacity>
      {file && (
        <View style={[s`flex-row items-center mx-6 mt-2`]}>
          <TouchableOpacity activeOpacity={0.7} onPress={viewFile}>
            {!isImageOrVideo(file.type) && (
              <Text style={infoTextStyle}>{file.name}</Text>
            )}
            {isImageOrVideo(file.type) && (
              <Image
                source={{ uri: file.uri }}
                style={imageStyle}
                resizeMode='cover'
              />
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={clearButtonStyle}
            onPress={resetFile}
            activeOpacity={0.7}
          >
            <Feather name='delete' size={20} color={clearIconColor} />
          </TouchableOpacity>
        </View>
      )}
    </>
  );
};

export default CustomImagePicker;
