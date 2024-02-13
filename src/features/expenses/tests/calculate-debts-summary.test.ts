import { CalculateDebtsSummaryQuery } from "../application/queries/calculate-debts-summary.query"
import { Expense } from "../domain/entities/Expense"
import { Debtor } from "../domain/entities/Debtor"
import { debtor1, debtor2, debtor3 } from "./mocks/debtors"
import { payer1, payer2, payer3 } from "./mocks/payers"

describe('CalculateDebtsSummary', () => {  
    const calculateDebtsSummary = new CalculateDebtsSummaryQuery()

    test('If no expenses, the function must return a void dict', () => {
        expect(calculateDebtsSummary.execute([])).toEqual({})
    }) 
    test('Debts summary must return a dict like user.id-Debtor', () => {
        const expenses:Expense[] = [
            {id: '1', concept:'concepto 1', payers: [payer1], debtors: [debtor1]},
            {id: '2', concept:'concepto 2', payers: [payer1, payer2], debtors: []}
        ]
        const expectedCalculatedDebtsSummary: {[key: string]: Debtor} = {
            [payer1.id]: {...payer1, amount: -75},
            [payer2.id]: {...payer2, amount: 25},
            [debtor1.id]: {...debtor1, amount: 50},
        }
        const calculatedDebtsSummary = calculateDebtsSummary.execute(expenses)
        expect(calculatedDebtsSummary).toEqual(expectedCalculatedDebtsSummary)
    })
})