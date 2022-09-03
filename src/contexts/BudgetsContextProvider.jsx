import {budgetsContext, UNCATEGORIZED_BUDGET_ID} from "./BudgetsContext";
import { v4 as uuidV4 } from "uuid";

import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContextProvider = ({ children }) => {
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };
  const addExpense = ({ description, amount, budgetId }) =>
    setExpenses((prevExpenses) => [
      ...prevExpenses,
      { id: uuidV4(), description, amount, budgetId },
    ]);

  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }

      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  const deleteBudget = ({ id }) => {
      setExpenses((prevExpenses) => {
          return prevExpenses.map((expense) => {
              if (expense.budgetId !== id) return expense

              return {...expense, budgetId: UNCATEGORIZED_BUDGET_ID}
          })
      })

      setBudgets((prevBudgets) =>
          prevBudgets.filter((budget) => budget.id !== id)
      );
  }


  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== id)
    );
  };

  return (
    <budgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addExpense,
        addBudget,
        deleteBudget,
        deleteExpense,
      }}
    >
      {children}
    </budgetsContext.Provider>
  );
};

export default BudgetsContextProvider;
