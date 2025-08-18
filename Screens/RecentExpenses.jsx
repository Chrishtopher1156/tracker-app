import { useContext, useEffect, useState } from "react";

import ExpensesOutput from "../components/ExpensesOutput/ExpensesOutput";
import { ExpenseContext } from '../store/Expense-Context';
import { getDateMinusDays } from "../util/date";
import { fetchExpenses } from "../util/http";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import ErrorOverlay from "../components/UI/ErrorOverlay";

function RecentExpenses() {
  const[isFetching, setIsFetching]=useState(true);
  const[error, setError] = useState();

  const expensesCtx = useContext(ExpenseContext);


  // calling api
  useEffect(()=>{
    async function getExpenses() {
      setIsFetching(true);

      try {
        const expenses = await fetchExpenses();
        expensesCtx.setExpenses(expenses);
      } catch (error) {
        setError('Could not fetch expenses!');
      }
      setIsFetching(false);
     
      
    }
    
    getExpenses();
  },[]);

  //remove error overlay
  function errorHandler() {
    setError(null);
  }

  if (error && !isFetching) {
    return <ErrorOverlay message={error} onConfirm={errorHandler}/>
  }

  if (isFetching) {
    return <LoadingOverlay />
  }

  //const recentExpenses = expensesCtx.expense.filter()
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