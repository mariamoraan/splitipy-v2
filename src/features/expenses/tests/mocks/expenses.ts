import { Expense } from '../../domain/entities/Expense'
import { debtor1, debtor2 } from './debtors'
import { payer1, payer2 } from './payers'

export const expensesMock: Expense[] = [
    {
        id: 'expense-1',
        concept: 'Expense 1',
        payers: [payer1],
        debtors: [debtor1],
        date: new Date('13-03-2022'),
    },
    {
        id: 'expense-2',
        concept: 'Expense 2',
        payers: [payer1, payer2],
        debtors: [debtor1],
        date: new Date('13-03-2022'),
    },
    {
        id: 'expense-3',
        concept: 'Expense 3',
        payers: [payer1],
        debtors: [debtor1, debtor2],
        date: new Date('13-03-2022'),
    },
]
