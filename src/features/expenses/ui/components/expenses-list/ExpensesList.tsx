import { useEffect, useState } from 'react'
import { Balance } from '@expenses/domain/entities/Balance'
import { Expense } from '@expenses/domain/entities/Expense'
import { ExpenseCard } from '@expenses/ui/components/expense/ExpenseCard'
import { NoExpenses } from '../no-expenses/NoExpenses'
import { BalanceCard } from '@expenses/ui/components/balance-card/BalanceCard'
import styles from '@expenses/ui/components/expenses-list/ExpensesList.module.css'
import { CalculateBalanceQuery } from '@expenses/application/queries/calculate-balance.query'

interface Props {
    expenses: Expense[]
}

const calculateBalance = new CalculateBalanceQuery()

export const ExpensesList = (props: Props) => {
    const { expenses } = props
    const [balance, setBalance] = useState<Balance>([])

    useEffect(() => {
        const setUpBalance = async () => {
            const newBalance = await calculateBalance.execute(expenses)
            setBalance(newBalance)
        }
        setUpBalance()
    }, [expenses.length])

    if (expenses.length === 0) return <NoExpenses />

    return (
        <>
            <BalanceCard balance={balance} />
            <ul className={styles.expenses_list}>
                {expenses
                    .sort((expense1, expense2) =>
                        expense1.date > expense2.date ? -1 : 1
                    )
                    .map((expense) => (
                        <li key={expense.id} className={styles.expense}>
                            <ExpenseCard expense={expense} />
                        </li>
                    ))}
            </ul>
        </>
    )
}
