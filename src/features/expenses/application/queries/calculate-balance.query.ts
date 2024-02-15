import { Query } from '@common/infrastructure/Query'
import { AuthLocator } from '@auth/infrastructure/di/container'
import { Balance } from '../../domain/entities/Balance'
import { Expense } from '../../domain/entities/Expense'
import { Transaction } from '../../domain/entities/Transaction'
import { CalculateDebtsSummaryQuery } from './calculate-debts-summary.query'

export class CalculateBalanceQuery implements Query<Balance, Expense[]> {
    private calculateSummary = new CalculateDebtsSummaryQuery()

    private calculatePartialDebt = (
        payerAmount: number,
        debtorAmount: number
    ) => {
        if (payerAmount >= debtorAmount) return debtorAmount
        else return payerAmount
    }

    async execute(expenses: Expense[]): Promise<Balance> {
        const getUserById = AuthLocator.getGetUserById()
        const summary = this.calculateSummary.execute(expenses)

        const payers = Object.values(summary)
            .filter(({ amount }) => amount < 0)
            .map(({ id, amount }) => ({ id, amount: Math.abs(amount) }))
        const debtors = Object.values(summary)
            .filter(({ amount }) => amount > 0)
            .map(({ id, amount }) => ({ id, amount }))
        const balanceMap: { [key: string]: number } = {}
        const balance: Balance = []

        for (const payer of payers) {
            if (!balanceMap[payer.id]) balanceMap[payer.id] = payer.amount
            let payerPartialAmount = balanceMap[payer.id]
            if (payerPartialAmount > 0.01) {
                for (const debtor of debtors) {
                    const payerUser = await getUserById.execute(payer.id)
                    const debtorUser = await getUserById.execute(debtor.id)
                    if (!payerUser || !debtorUser) return []

                    payerPartialAmount = balanceMap[payer.id]
                    if (balanceMap[debtor.id] === undefined)
                        balanceMap[debtor.id] = debtor.amount
                    const debtorPartialAmount = balanceMap[debtor.id]
                    if (
                        debtorPartialAmount > 0.01 &&
                        payerPartialAmount > 0.01
                    ) {
                        const partialDebt = Number(
                            this.calculatePartialDebt(
                                payerPartialAmount,
                                debtorPartialAmount
                            ).toFixed(2)
                        )
                        balanceMap[payer.id] = payerPartialAmount - partialDebt
                        balanceMap[debtor.id] =
                            debtorPartialAmount - partialDebt

                        if (payerUser && debtorUser) {
                            const transaction: Transaction = {
                                from: debtorUser,
                                to: payerUser,
                                amount: partialDebt,
                            }
                            balance.push(transaction)
                        }
                    }
                }
            }
        }
        return balance
    }
}
