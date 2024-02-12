import { Expense } from "../entities/Expense";
import { ExpenseId } from "../entities/ExpenseId";


export interface ExpensesRepository {
    createExpense: (expense: Omit<Expense, 'id'>) => Promise<Expense>,
    getExpenses: () => Promise<Expense[]>,
    getExpenseById: (id: ExpenseId) => Promise<Expense|null>
}
