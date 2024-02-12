import { GetExpenseByIdQuery } from "../application/queries/get-expense-by-id.query"
import { ExpensesRepository } from "../domain/repositories/ExpensesRepository";
import { expensesMock } from "./mocks/expenses"
import { mock } from 'jest-mock-extended';

const setUp = () => {
    const expensesRepository = mock<ExpensesRepository>()
    const getExpenseById = new GetExpenseByIdQuery(expensesRepository)
    return {expensesRepository, getExpenseById}
}

describe('GetExpensesById - ExpensesLocalDBRepository', () => {
    test('The function must return null id the specified id not exists', async() => {
        const {expensesRepository, getExpenseById} = setUp()
        expensesRepository.getExpenseById.mockResolvedValue(null)
        const res = await getExpenseById.execute('unexistant-key')
        expect(res).toBe(null)
    })
    test('The function must return a Expense with the specified id if exist', async() => {
        const {expensesRepository, getExpenseById} = setUp()
        const expense = expensesMock[0]
        expensesRepository.getExpenseById.mockResolvedValue(expense)

        const res = await getExpenseById.execute(expense.id)
        expect(res).toEqual(expense)
    })
})