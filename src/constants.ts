enum TodoStatus {
  InProgres = 'In Progress',
  Completed = 'Completed',
  Cancelled = 'Cancelled'
}

enum ColorSchemes {
  light = 'light',
  dark = 'dark'
}

enum ScreenNames {
  Home = 'Home'
}

const themeColors = {
  violet100: {
    light: '#ede9fe',
    dark: '#b4a4fc'
  },
  violet200: {
    light: '#ddd6fe',
    dark: '#9881ff'
  },
  violet400: {
    light: '#a78bfa',
    dark: '#413B54'
  },
  violet500: {
    light: '#8b5cf6',
    dark: '#231f2e'
  },
  violet500_1: {
    light: '#8b5cf6',
    dark: '#e6e6e6'
  },
  white: {
    light: '#fff',
    dark: '#e6e6e6'
  },
  white_1: {
    light: '#fff',
    dark: '#adadad'
  },
  green200: {
    light: '#bbf7d0',
    dark: '#84ae93'
  },
  blue200: {
    light: '#bfdbfe',
    dark: '#8787ff'
  },
  red200: {
    light: '#fecaca',
    dark: '#c29a9a'
  },
  gray: {
    light: '#393939',
    dark: '#000'
  },
  red400: {
    light: '#f87171',
    dark: '#FF0000'
  }
};

const todoStatusColors = {
  '': 'bg-white_1',
  [TodoStatus.InProgres]: 'bg-green200',
  [TodoStatus.Completed]: 'bg-blue200',
  [TodoStatus.Cancelled]: 'bg-red200'
};

export { TodoStatus, ColorSchemes, ScreenNames, themeColors, todoStatusColors };
