import { useContext } from 'react';
import ExpensesOutput from '../component/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
  const expensesCtx = useContext(ExpensesContext);

  const RecentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;

  })
  return (
   <ExpensesOutput 
    expenses={RecentExpenses} 
    expensePeriod="Last 7 days"
    fallbackText='No expenses registed for the last 7 days'
  />
  ); 
} 

export default RecentExpenses;