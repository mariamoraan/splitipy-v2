import type { ExpensesRepository } from '../../domain/repositories/ExpensesRepository'
import { Expense } from '../../domain/entities/Expense'
import { Query } from '../../../../common/infrastructure/Query'

export class GetExpensesQuery implements Query<Expense[]> {
    constructor(private expensesRepository: ExpensesRepository) {}

    async execute() {
        const expenses = await this.expensesRepository.getExpenses()
        return expenses
    }
}
