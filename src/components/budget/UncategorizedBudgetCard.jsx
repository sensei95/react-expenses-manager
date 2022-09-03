import BudgetCard from "../BudgetCard.jsx";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../../contexts/BudgetsContext.js";

export const UncategorizedBudgetCard = (props) => {
    const {getBudgetExpenses} = useBudgets();
    const amount = getBudgetExpenses(UNCATEGORIZED_BUDGET_ID).reduce((total, expense) => total + expense.amount , 0)

    if(amount === 0)  return null

    return (
        <BudgetCard gray {...props} amount={amount}  name="Uncategorized" />
    )
}