import { User } from "../../auth/domain/entities/User";
import { Expense } from "../domain/entities/Expense";
import { CalculateDebtsSummary } from "./calculate-debts-summary";

export class CalculateBalance  {
    private calculateSummary = new CalculateDebtsSummary()
    execute(expenses: Expense[]):{from: User, to: User, amount: number}[] {
        const summary = this.calculateSummary.execute(expenses)
        const participantsIds = Object.keys(summary)
        const payers = Object.values(summary).filter(({amount}) => amount > 0).map(({id}) => id)
        const debtors = Object.values(summary).filter(({amount}) => amount < 0).map(({id}) => id)
        const balanceMap = {}
        return []
    }
}