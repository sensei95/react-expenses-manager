import BudgetCard from "../BudgetCard.jsx";
import {useBudgets} from "../../contexts/BudgetsContext.js";

export const TotalBudgetCard = () => {

    const {budgets, expenses, getBudgetExpenses} = useBudgets()
    const amount = expenses.reduce((total, expense) => total + expense.amount, 0)
    const max = budgets.reduce((total, budget) => total + budget.max, 0)

    if(max === 0) return null

    return (
        <BudgetCard  name="Total" amount={amount} gray max={max} hideActions/>
    )
}