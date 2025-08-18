import { Children, createContext, useReducer } from "react"

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({description, amout, date}) => {},
  updateExpense: (id, {description, amout, date}) => {},
  deleteExpense: (id) => {},
  setExpenses: (expenses) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      //const id = new Date().toString() + Math.random().toString();
      return [action.payload, ...state];
    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updatableExpense = state[updateableExpenseIndex];
      const updateItem = { ...updatableExpense, ...action.payload.data};
      const updatedExpense = [ ...state];
      updatedExpense[updateableExpenseIndex] = updateItem;
      return updatedExpense;
    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);
    case 'SET':
      const inverted = action.payload.reverse();
      return inverted;
    default:
      return state;
  }
}

export const ExpensesContextProvider = ({ children }) => {
  const[expensesState, dispatch]=useReducer(expenseReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }});
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function setExpenses(expenses) {
    dispatch({ type: 'SET', payload: expenses })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
    setExpenses: setExpenses,
  };
  
  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}
