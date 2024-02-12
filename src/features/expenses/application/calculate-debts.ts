import { Expense } from "../domain/entities/Expense";
import { Debtor } from "../domain/entities/Debtor";
import { Payer } from "../domain/entities/Payer";



export class CalculateDebts {
    execute(expense: Expense): Debtor[] {
        const {payers, debtors} = expense
        if(payers.length === 0 && debtors.length === 0) return []
        const totalAmount = payers.reduce((prev, current) => prev + current.amount, 0)
        const amountPerPerson:number = (totalAmount/(payers.length + debtors.length))
        const calculatedDebtors: Debtor[] = []
        payers.forEach(payer => {
            calculatedDebtors.push({
                ...payer,
                amount: amountPerPerson - payer.amount
            })
        })
        debtors.forEach(debtor => {
            calculatedDebtors.push({
                ...debtor,
                amount: amountPerPerson - debtor.amount
            })
        })
        return calculatedDebtors
    }
}