import { StatusBar } from "expo-status-bar";

import Navigation from "./navigation/navigation";
import { ExpensesContextProvider }from './store/Expense-Context';

export default function App() {
  return (
    <>
      <StatusBar style="light"/>
      <ExpensesContextProvider>
        <Navigation />
      </ExpensesContextProvider>
    </>
  );
}
