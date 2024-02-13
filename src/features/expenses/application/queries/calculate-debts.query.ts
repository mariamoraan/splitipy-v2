import { Expense } from "../../domain/entities/Expense";
import { Debtor } from "../../domain/entities/Debtor";

export class CalculateDebtsQuery {
    execute(expense: Expense): Debtor[] {
        const {payers, debtors} = expense
        if(payers.length === 0 && debtors.length === 0) return []
        const totalAmount = payers.reduce((prev, current) => prev + current.amount, 0)
        const amountPerPerson:number = (totalAmount/(payers.length + debtors.length))
        const calculatedDebtors: Debtor[] = []
        payers.forEach(payer => {
            calculatedDebtors.push({
                ...payer,
                amount: Number((amountPerPerson - payer.amount).toFixed(2))
            })
        })
        debtors.forEach(debtor => {
            calculatedDebtors.push({
                ...debtor,
                amount: Number((amountPerPerson - debtor.amount).toFixed(2))
            })
        })
        return calculatedDebtors
    }
}