enum TodoStatus {
  InProgres = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

enum ColorSchemes {
  light = 'light',
  dark = 'dark'
}

const todoStatusColors = {
  '': 'bg-white',
  [TodoStatus.InProgres]: 'bg-green-200',
  [TodoStatus.Completed]: 'bg-blue-200',
  [TodoStatus.Cancelled]: 'bg-red-200'
};

const themeColors = {
  violet500: {
    light: '#8b5cf6',
    dark: '#231f2e'
  },
  white: {
    light: '#fff',
    dark: '#E6E6E6'
  }
};

export { TodoStatus, ColorSchemes, todoStatusColors, themeColors };
