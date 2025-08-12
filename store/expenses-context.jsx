import { createContext, useReducer } from "react";

const DUMMY_EXPENSES = [
  {
    id: 'e1',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2025-01-19')
  },
  {
    id: 'e2',
    description: 'A pair of trouser',
    amount: 89.96,
    date: new Date('2025-04-01')
  },
  {
    id: 'e3',
    description: 'A book',
    amount: 45.86,
    date: new Date('2025-06-27')
  },
  {
    id: 'e4',
    description: 'a catoon of coke',
    amount: 56.45,
    date: new Date('2025-08-07')
  },
  {
    id: 'e5',
    description: 'box of orange seedlings',
    amount:345.67,
    date: new Date('2025-08-10')
  },
  {
    id: 'e6',
    description: 'A pair of shoes',
    amount: 59.99,
    date: new Date('2025-01-19')
  },
  {
    id: 'e7',
    description: 'A pair of trouser',
    amount: 89.96,
    date: new Date('2025-04-01')
  },
  {
    id: 'e8',
    description: 'A book',
    amount: 45.86,
    date: new Date('2025-06-27')
  },
  {
    id: 'e9',
    description: 'a catoon of coke',
    amount: 56.45,
    date: new Date('2025-08-07')
  },
  {
    id: 'e10',
    description: 'box of orange seedlings',
    amount:345.67,
    date: new Date('2025-08-10')
  },
]


export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({description, amount, date}) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, {description, amount, date}) => {}
});


function expensesReducer(state, action) {
  switch (action.type) {
    case 'ADD':
      const id = new Date().toString() + Math.random().toString();
      return [{...action.payload, id: id },...state]

    case 'UPDATE':
      const updateableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );
      const updateableExpense = state[updateableExpenseIndex];
      const updatedItem = {...updateableExpense, ...action.payload.data};
      const updatedExpenses = [...state];
      updatedExpenses[updateableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case 'DELETE':
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state
  }
}
const ExpensesContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  function addExpense(expenseData) {
    dispatch({ type: 'ADD', payload: expenseData});
  }

  function deleteExpense(id) {
    dispatch({ type: 'DELETE', payload: id })
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: 'UPDATE', payload: { id: id, data: expenseData }})
  }

  const value = {
    expenses: expensesState,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense
  }

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  )
};

export default ExpensesContextProvider;

