import {UNCATEGORIZED_BUDGET_ID, useBudgets} from "../../contexts/BudgetsContext.js";
import {Button, Modal, Stack} from "react-bootstrap";
import {currencyFormatter} from "../../utils.js";

export const ShowExpensesModal = ({handleClose, budgetId}) => {

    const {getBudgetExpenses, deleteBudget, deleteExpense, budgets} = useBudgets();
    const expenses = getBudgetExpenses(budgetId)

    const budget = budgetId === UNCATEGORIZED_BUDGET_ID ?
        {name : 'Uncategorized', id: UNCATEGORIZED_BUDGET_ID} :
        budgets.find(budget => budgetId === budget.id)

    return (
        <Modal show={budgetId != null} onHide={handleClose}>
            <Modal.Header>
                <Modal.Title>
                    <Stack direction="horizontal" gap={2}>
                        <h3>Expenses - {budget?.name}</h3>
                    </Stack>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {expenses.length && expenses.map(expense =>
                    <Stack direction="horizontal" gap={2} key={expense.id} className="mb-3 border-bottom py-3">
                        {expense.description}
                        <Stack direction="horizontal" gap={3} className="ms-auto">
                            {currencyFormatter.format(expense.amount)}
                            <Button variant="outline-danger" onClick={() => {deleteExpense(expense)}} size="sm">&times;</Button>
                        </Stack>
                    </Stack>
                )}
            </Modal.Body>
            <Modal.Footer>
                {budgetId !== UNCATEGORIZED_BUDGET_ID && <div className="ms-auto">
                    <Button variant="outline-danger" onClick={() => {
                        deleteBudget(budget)
                        handleClose()
                    }}>Delete</Button>
                </div>}
            </Modal.Footer>
        </Modal>
    )
}