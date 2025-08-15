import { useContext } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from '../store/Expense-Context';
import { getDateMinusDays } from "../util/date";

function RecentExpenses() {
  const expensesCtx = useContext(ExpenseContext);

  const recentExpenses = expensesCtx.expenses.filter((expense) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expense.date > date7DaysAgo;
  })
  return (
    <ExpensesOutput 
      expenses={recentExpenses}
      fallbackText='No expenses registered for the last 7 days.'
      expensesPeriod ='Last 7 Days'
    />
  );
}

export default RecentExpenses;