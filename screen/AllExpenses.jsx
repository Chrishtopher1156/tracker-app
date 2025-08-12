import { useContext } from 'react';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';

const AllExpense = () => {
const expensesCtx = useContext(ExpensesContext)
  return (
    <ExpensesOutput 
      expenses={expensesCtx.expenses} 
      expensePeriod="Total" 
      fallbackText = 'No registed expeses found!'
    />
  ); 
} 

export default AllExpense;