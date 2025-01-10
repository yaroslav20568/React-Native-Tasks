import { TodoStatus } from '../constants';

type TTodoStatus =
  | ''
  | TodoStatus.InProgres
  | TodoStatus.Completed
  | TodoStatus.Cancelled;

interface ITodo {
  id: string;
  title: string;
  description: string;
  executionAt: Date;
  location: string;
  status: TTodoStatus;
  createdAt: Date;
}

interface IAddFormData
  extends Pick<ITodo, 'title' | 'description' | 'executionAt' | 'location'> {}

interface IsortedParams {
  ascSortPubDate: boolean;
  ascSortStatus: boolean;
}

export type { TTodoStatus, ITodo, IAddFormData, IsortedParams };
