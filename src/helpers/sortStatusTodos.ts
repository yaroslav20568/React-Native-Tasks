import { ITodo } from '../types';

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
              ['In Progress', []],
              ['Completed', []],
              ['Cancelled', []]
            ])
          : new Map([
              ['Cancelled', []],
              ['Completed', []],
              ['In Progress', []],
              ['', []]
            ])
      )
      .values()
  ].flat();
};

export default sortStatusTodos;
