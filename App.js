import { StatusBar } from 'expo-status-bar';
import Navigation from './navigation/Navigation';
import ExpensesContextProvider from './store/expenses-context';

export default function App() {
  return (
    <>
      <StatusBar style='light' />
      <ExpensesContextProvider>
        <Navigation />
      </ExpensesContextProvider>
    </>
  )
}


