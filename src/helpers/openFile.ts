import FileViewer from 'react-native-file-viewer';
import { ToastType } from 'react-native-toast-notifications';

const openFile = async (fileUri: string, toast: ToastType) => {
  try {
    await FileViewer.open(fileUri);
  } catch {
    toast.show('The file was not found, was deleted or moved');
  }
};

export default openFile;
