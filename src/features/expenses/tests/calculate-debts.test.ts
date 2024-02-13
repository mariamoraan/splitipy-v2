import { Expense } from '../domain/entities/Expense'
import { Debtor } from '../domain/entities/Debtor'
import { debtor3 } from './mocks/debtors'
import { payer1, payer2 } from './mocks/payers'
import { CalculateDebtsQuery } from '../application/queries/calculate-debts.query'

describe('CalculateDebts', () => {
    const calculateDebts = new CalculateDebtsQuery()
    test('CalculateDebts must return an array of Debtors for a expense with n payers and 0 debtors', () => {
        const expense: Expense = {
            id: '1',
            concept: 'concept 1',
            payers: [payer1, payer2],
            debtors: [],
        }
        const expected: Debtor[] = [
            { ...payer1, amount: -25 },
            { ...payer2, amount: 25 },
        ]
        expect(calculateDebts.execute(expense)).toEqual(expected)
    })
    test('CalculateDebts must return an array of Debtors for a expense with n payers and n debtors', () => {
        const expense: Expense = {
            id: '1',
            concept: 'concept 1',
            payers: [payer1, payer2],
            debtors: [debtor3],
        }
        const expected: Debtor[] = [
            { ...payer1, amount: -50 },
            { ...payer2, amount: 0 },
            { ...debtor3, amount: 50 },
        ]
        expect(calculateDebts.execute(expense)).toEqual(expected)
    })
})
