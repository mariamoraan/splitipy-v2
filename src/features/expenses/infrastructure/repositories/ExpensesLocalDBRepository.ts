import type { LocalDB } from '../../../../common/domain/LocalDB'
import { Expense } from '../../domain/entities/Expense'
import { ExpensesRepository } from '../../domain/repositories/ExpensesRepository'
import { v4 as uuidv4 } from 'uuid'

export class ExpensesLocalDBRepository implements ExpensesRepository {
    private expensesKey = 'EXPENSES'
    constructor(private localDB: LocalDB) {}

    getExpenseById = async (id: string): Promise<Expense | null> => {
        const expenses = await this.getExpenses()
        return expenses.find((expense) => expense.id === id) || null
    }
    createExpense = async (expense: Omit<Expense, 'id'>): Promise<Expense> => {
        const expenses = await this.getExpenses()
        const newExpense: Expense = { ...expense, id: uuidv4() }
        this.localDB.setItem(
            this.expensesKey,
            JSON.stringify([...expenses, newExpense])
        )
        return newExpense
    }
    getExpenses = async (): Promise<Expense[]> => {
        const expenses: Expense[] = [
            ...JSON.parse(
                (await this.localDB.getItem(this.expensesKey)) || '[]'
            ),
        ]
        return expenses.map((expense) => ({
            ...expense,
            date: new Date(expense.date),
        }))
    }
}
