import { Query } from '../../../../common/infrastructure/Query'
import { Expense } from '../../domain/entities/Expense'
import { ExpensesRepository } from '../../domain/repositories/ExpensesRepository'

export class GetExpenseByIdQuery implements Query<Expense | null, string> {
    expensesRepository: ExpensesRepository
    constructor(expensesRepository: ExpensesRepository) {
        this.expensesRepository = expensesRepository
    }

    async execute(id: string): Promise<Expense | null> {
        const expenses = await this.expensesRepository.getExpenseById(id)
        return expenses
    }
}
