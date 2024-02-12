import { CreateExpenseCommand } from "../application/commands/create-expense.command"
import { GetExpenseByIdQuery } from "../application/queries/get-expense-by-id.query"
import { Expense } from "../domain/entities/Expense"
import { ExpensesRepository } from "../domain/repositories/ExpensesRepository"
import { debtor1 } from "./mocks/debtors"
import { payer1 } from "./mocks/payers"
import { mock } from 'jest-mock-extended';

const setUp = () => {
    const expensesRepository = mock<ExpensesRepository>()
    const createExpense = new CreateExpenseCommand(expensesRepository)
    const expense:Omit<Expense, 'id'> = {
        concept: "Concept",
        payers: [payer1],
        debtors: [debtor1]
    }
    return {expensesRepository, createExpense, expense}
}

describe('CreateExpense - ExpensesLocalDBRepository', () => {
    test('The function must return the input expense with an id', async() => {
        const {expense, createExpense, expensesRepository} = setUp()

        expensesRepository.createExpense.mockResolvedValue({...expense, id: 'concept-id'})
        const newExpense:Expense = await createExpense.execute(expense)
        expect(typeof newExpense.id).toBe('string')
        expect(newExpense.concept).toBe(expense.concept)
        expect(newExpense.payers).toEqual(expense.payers)
        expect(newExpense.debtors).toEqual(expense.debtors)
    })
    test('The function must aggregate the new expense to the expenses', async() => {
        const {expense, expensesRepository, createExpense} = setUp()
        expensesRepository.createExpense.mockResolvedValue({...expense, id: 'concept-id'})
        expensesRepository.getExpenseById.mockResolvedValue({...expense, id: 'concept-id'})

        const getExpenseById = new GetExpenseByIdQuery(expensesRepository)
        const newExpense:Expense = await createExpense.execute(expense)
        const savedExpense:Expense | null = await getExpenseById.execute(newExpense.id)
        expect(savedExpense).toEqual(newExpense)
    })
})