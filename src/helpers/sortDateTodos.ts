import { ITodo } from '../types';

const sortDateTodos = (todos: Array<ITodo>, ascSortPubDate: boolean) => {
  if (ascSortPubDate) {
    return [...todos].sort((a, b) =>
      String(a.createdAt) < String(b.createdAt)
        ? -1
        : String(a.createdAt) > String(b.createdAt)
        ? 1
        : 0
    );
  } else {
    return [...todos].sort((a, b) =>
      String(a.createdAt) > String(b.createdAt)
        ? -1
        : String(a.createdAt) < String(b.createdAt)
        ? 1
        : 0
    );
  }
};

export default sortDateTodos;
