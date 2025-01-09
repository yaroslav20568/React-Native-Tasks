enum TodoStatus {
  InProgres = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

const todoStatusColors = {
  '': 'bg-white',
  [TodoStatus.InProgres]: 'bg-green-200',
  [TodoStatus.Completed]: 'bg-blue-200',
  [TodoStatus.Cancelled]: 'bg-red-200'
};

export { TodoStatus, todoStatusColors };
