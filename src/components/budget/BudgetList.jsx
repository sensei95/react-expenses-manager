import React, {useState} from 'react';
import BudgetCard from "../BudgetCard.jsx";
import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../../contexts/BudgetsContext.js";
import AddBudgetModal from "../AddBudgetModal.jsx";
import AddExpenseModal from "../AddExpenseModal.jsx";
import {Button, Stack} from "react-bootstrap";
import {UncategorizedBudgetCard} from "./UncategorizedBudgetCard";
import {TotalBudgetCard} from "./TotalBudgetCard";
import {ShowExpensesModal} from "../expense/ShowExpensesModal";

function BudgetList() {

    const [showAddBudgetModal, setShowAddBudgetModal] = useState();
    const [showAddExpenseModal, setShowAddExpenseModal] = useState();
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId] = useState();
    const [ShowBudgetExpensesModalBudgetId, setShowBudgetExpensesModalBudgetId] = useState();

    const {budgets, getBudgetExpenses} = useBudgets()

    const openAddExpenseModal = (budgetId) => {
        setShowAddExpenseModal(true);
        setAddExpenseModalBudgetId(budgetId);
    };

    const openShowExpensesModal = (budgetId) => {
        setShowBudgetExpensesModalBudgetId(budgetId);
    };

    return (
        <>
            <Stack gap={2} direction="horizontal" className="mb-4">
                <h1 className="me-auto">Budgets</h1>
                <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>
                    Add Budget
                </Button>
                <Button variant="outline-primary" onClick={openAddExpenseModal}>
                    Add Expense
                </Button>
            </Stack>
             <div
                style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                    gap: "1rem",
                    alignItems: "flex-start",
                }}
            >
                {budgets.map((budget) => {
                    const amount = getBudgetExpenses(budget.id).reduce(
                        (total, expense) => total + expense.amount,
                        0
                    );

                    return (
                        <BudgetCard
                            name={budget.name}
                            amount={amount}
                            max={budget.max}
                            key={budget.id}
                            onAddExpenseClick={() => openAddExpenseModal(budget.id)}
                            onShowExpensesClick={() => openShowExpensesModal(budget.id)}
                        />
                    );
                })}
                 <UncategorizedBudgetCard onAddExpenseClick={() => openAddExpenseModal(UNCATEGORIZED_BUDGET_ID)} onShowExpensesClick={() => openShowExpensesModal(UNCATEGORIZED_BUDGET_ID)} />
                 <TotalBudgetCard />
            </div>
            <AddBudgetModal
                show={showAddBudgetModal}
                handleClose={() => setShowAddBudgetModal(false)}
            />
            <AddExpenseModal
                show={showAddExpenseModal}
                defaultBudgetId={addExpenseModalBudgetId}
                handleClose={() => setShowAddExpenseModal(false)}
            />
            <ShowExpensesModal budgetId={ShowBudgetExpensesModalBudgetId} handleClose={() => setShowBudgetExpensesModalBudgetId()}  />
        </>
    );
}

export default BudgetList;