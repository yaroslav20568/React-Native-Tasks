import React from 'react';
import { SafeAreaView } from 'react-native';
import { s } from 'react-native-wind';
import TodosHeader from './src/components/TodosHeader';

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={s`flex-1 bg-violet-100`}>
      <TodosHeader />
    </SafeAreaView>
  );
};

export default App;
