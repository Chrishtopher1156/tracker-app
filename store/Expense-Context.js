import { Children, createContext, useReducer } from "react"

export const ExpenseContext = createContext({
  expenses: [],
  addExpense: ({description, amout, date}) => {},
  updateExpense: (id, {description, amout, date}) => {},
  deleteExpense: (id) => {},
});

function expenseReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id}, ...state];
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
    default:
      return state;
  }
}

export const ExpensesContextProvider = ({ children }) => {
  const[expensesState, dispatch]=useReducer(expenseReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }});
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    updateExpense: updateExpense,
    deleteExpense: deleteExpense,
  };
  
  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
}



const DUMMY_EXPENSES = [
  {
    id: 'ex1',
    description: 'A pair of shoes',
    amount: 35.69,
    date: new Date('2025-01-23'),
  },
  {
    id: 'ex2',
    description: 'Sun glases',
    amount: 45.89,
    date: new Date('2025-07-30'),
  },
  {
    id: 'ex3',
    description: 'Baby cloths',
    amount: 89.99,
    date: new Date('2025-04-19'),
  },
  {
    id: 'ex4',
    description: 'Stationaries for kids',
    amount: 99.23,
    date: new Date('2025-08-12'),
  },
  {
    id: 'ex5',
    description: 'Catton of drinks',
    amount: 27.54,
    date: new Date('2024-12-03'),
  },
  {
    id: 'ex6',
    description: 'A bottol of wine',
    amount: 56.78,
    date: new Date('2025-07-02'),
  },
  {
    id: 'ex7',
    description: 'A traditional bilum',
    amount: 67.81,
    date: new Date('2025-06-15'),
  },
  {
    id: 'ex8',
    description: 'Mens shirt',
    amount: 35.69,
    date: new Date('2025-05-25'),
  },
];