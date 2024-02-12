import { GetExpensesQuery } from "../application/queries/get-expenses.query"
import { ExpensesRepository } from "../domain/repositories/ExpensesRepository"
import { expensesMock } from "./mocks/expenses"
import { mock } from 'jest-mock-extended';

const setUp = () => {
    const expensesRepository = mock<ExpensesRepository>()
    const getExpenses = new GetExpensesQuery(expensesRepository)
    return {expensesRepository, getExpenses}
}

describe('GetExpenses - ExpensesLocalDBRepository', () => {
    test('The function must return an array with the expenses', async() => {
        const {expensesRepository, getExpenses} = setUp()
        expensesRepository.getExpenses.mockResolvedValue(expensesMock)
        const res = await getExpenses.execute()
        expect(res).toEqual(expensesMock)
    })
})