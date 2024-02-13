import { Expense } from "../../domain/entities/Expense";
import type { ExpensesRepository } from "../../domain/repositories/ExpensesRepository";
import { Command } from "../../../../common/infrastructure/Command";

export class CreateExpenseCommand implements Command<Omit<Expense, 'id'>, Expense> {
    constructor(private expensesRepository: ExpensesRepository) {}

    async execute(expense: Omit<Expense, 'id'>):Promise<Expense> {
        const newExpense = await this.expensesRepository.createExpense(expense)
        return newExpense
    }   
}