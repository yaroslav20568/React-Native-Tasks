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
};

interface ILogAction {
  name: string;
  timestamp: Date;
}

interface ITodo {
  id: string;
  title: string;
  description: string;
  executionAt: Date;
  location: string;
  status: TTodoStatus;
  logActions: Array<ILogAction>;
  createdAt: Date;
}

interface IAddFormData
  extends Pick<ITodo, 'title' | 'description' | 'executionAt' | 'location'> {}

interface IsortedParams {
  ascSortPubDate: boolean;
  ascSortStatus: boolean;
}

export type {
  TTodoStatus,
  TRootStackParamList,
  ILogAction,
  ITodo,
  IAddFormData,
  IsortedParams
};
