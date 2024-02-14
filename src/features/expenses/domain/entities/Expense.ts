import { Debtor } from './Debtor'
import { ExpenseId } from './ExpenseId'
import { Payer } from './Payer'

export interface Expense {
    id: ExpenseId
    concept: string
    payers: Payer[]
    debtors: Debtor[]
    date: Date
}
