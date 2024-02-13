import { Query } from '../../../../common/infrastructure/Query'
import { AuthLocator } from '../../../auth/infrastructure/di/container'
import { Balance } from '../../domain/entities/Balance'
import { Expense } from '../../domain/entities/Expense'
import { CalculateDebtsSummaryQuery } from './calculate-debts-summary.query'

const modifyElem = <T>(elems: T[], elemIndex: number, newElem: T) => {
    return elems.map((elem, index) => (elemIndex === index ? newElem : elem))
}

export class CalculateBalanceQuery implements Query<Balance[], Expense[]> {
    private calculateSummary = new CalculateDebtsSummaryQuery()
    async execute(expenses: Expense[]): Promise<Balance[]> {
        const getUserById = AuthLocator.getGetUserById()
        const summary = this.calculateSummary.execute(expenses)

        const payers = Object.values(summary)
            .filter(({ amount }) => amount < 0)
            .map(({ id, amount }) => ({ id, amount }))
        const debtors = Object.values(summary)
            .filter(({ amount }) => amount > 0)
            .map(({ id, amount }) => ({ id, amount }))
        const balance: Balance[] = []

        for (const payer of payers) {
            if (payer.amount <= 0.01) {
                for (const debtor of debtors) {
                    if (debtor.amount >= 0.01) {
                        console.log(debtor.amount)
                        const partialDebt =
                            Math.abs(payer.amount) >= debtor.amount
                                ? Number(debtor.amount.toFixed(2))
                                : Number(
                                      (
                                          (Math.abs(payer.amount) /
                                              debtor.amount) *
                                          debtor.amount
                                      ).toFixed(2)
                                  )

                        if (partialDebt > 0) {
                            modifyElem(payers, payers.indexOf(payer), {
                                ...payer,
                                amount: Math.abs(payer.amount) - partialDebt,
                            })
                            modifyElem(debtors, debtors.indexOf(debtor), {
                                ...debtor,
                                amount: partialDebt,
                            })

                            const from = await getUserById.execute(debtor.id)
                            const to = await getUserById.execute(payer.id)

                            if (!from || !to) return []
                            console.log(
                                `from ${from.name} (${from.id}) to ${to.name} ${partialDebt}`
                            )
                            balance.push({ from, to, amount: partialDebt })
                        }
                    }
                }
            }
        }

        return balance
    }
}
