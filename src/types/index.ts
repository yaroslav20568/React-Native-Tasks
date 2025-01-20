import { TodoStatus } from '../constants';

type TTodoStatus =
  | ''
  | TodoStatus.InProgres
  | TodoStatus.Completed
  | TodoStatus.Cancelled;

type TRootStackParamList = {
  Home: undefined;
  TodoLog: {
    todoTitle: string;
    todoLogActions: Array<ILogAction>;
  };
  Map: undefined;
};

interface ILogAction {
  name: string;
  timestamp: Date;
}

interface ILocation {
  address: string;
  coords: {
    lat: number;
    lng: number;
  };
}

interface ITodo {
  id: string;
  title: string;
  description: string;
  executionAt: Date;
  location: ILocation;
  status: TTodoStatus;
  logActions: Array<ILogAction>;
  file: IFile | null;
  createdAt: Date;
}

interface IsortedParams {
  ascSortPubDate: boolean;
  ascSortStatus: boolean;
}

interface IFile {
  name: string;
  type: string;
  uri: string;
}

export type {
  TTodoStatus,
  TRootStackParamList,
  ILogAction,
  ILocation,
  ITodo,
  IsortedParams,
  IFile
};
