import { Expense } from "../domain/entities/Expense";
import { Debtor } from "../domain/entities/Debtor";
import { CalculateDebts } from "./calculate-debts";

export class CalculateDebtsSummary {
    private calculateDebts = new CalculateDebts()
    execute(expenses: Expense[]):{[key: string]: Debtor} {
        const debtorsMap: {[key: string]: Debtor} = {}
        expenses.forEach(expense => {
            const debtors = this.calculateDebts.execute(expense)
            debtors.forEach(debtor => {
                debtorsMap[debtor.id] = {
                    ...debtor, 
                    amount: debtorsMap[debtor.id] ? debtorsMap[debtor.id].amount + debtor.amount : debtor.amount
                }
            })
        })
        return debtorsMap
    }
}