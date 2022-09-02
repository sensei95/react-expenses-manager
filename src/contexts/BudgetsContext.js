import { createContext, useContext } from "react";

export const budgetsContext = createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
  return useContext(budgetsContext);
};
