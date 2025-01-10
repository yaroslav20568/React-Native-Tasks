import { ITodo } from '../types';
import { TodoStatus } from '../constants';

const sortStatusTodos = (todos: Array<ITodo>, ascSortStatus: boolean) => {
  return [
    ...todos
      .reduce(
        (lists, e) => {
          const list: Array<ITodo> | undefined =
            lists.get(e.status) ?? lists.get('Cancelled');
          list?.push(e);

          return lists;
        },
        ascSortStatus
          ? new Map([
              ['', []],
              [TodoStatus.InProgres, []],
              [TodoStatus.Completed, []],
              [TodoStatus.Cancelled, []]
            ])
          : new Map([
              [TodoStatus.Cancelled, []],
              [TodoStatus.Completed, []],
              [TodoStatus.InProgres, []],
              ['', []]
            ])
      )
      .values()
  ].flat();
};

export default sortStatusTodos;
