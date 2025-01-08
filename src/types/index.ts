import { TodoStatus } from '../constants';

type TTodoStatus =
  | null
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

export type { TTodoStatus, ITodo, IAddFormData };
