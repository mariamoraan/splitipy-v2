import { Expense } from "../../domain/entities/Expense";
import { Debtor } from "../../domain/entities/Debtor";
import { CalculateDebtsQuery } from "./calculate-debts.query";

export class CalculateDebtsSummaryQuery {
    private calculateDebts = new CalculateDebtsQuery()
    execute(expenses: Expense[]):{[key: string]: Debtor} {
        const debtorsMap: {[key: string]: Debtor} = {}
        expenses.forEach(expense => {
            const debtors = this.calculateDebts.execute(expense)
            debtors.forEach(debtor => {
                debtorsMap[debtor.id] = {
                    ...debtor, 
                    amount: Number((
                        debtorsMap[debtor.id] ? debtorsMap[debtor.id].amount + debtor.amount : debtor.amount
                    ).toFixed(2))
                }
            })
        })
        return debtorsMap
    }
}