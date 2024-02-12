import { useEffect, useState } from "react"
import { Expense } from "../../../domain/entities/Expense"
import { ExpenseId } from "../../../domain/entities/ExpenseId"
import { ExpenseCard } from "../expense/ExpenseCard"
import { NoExpenses } from "../no-expenses/NoExpenses"
import styles from './ExpensesList.module.css'
import { ExpensesLocator } from "../../../infrastructure/di/container"

interface Props {
    groupExpenses: ExpenseId[]
}

export const ExpensesList = (props: Props) => {
    const {groupExpenses} = props
    const [expenses, setExpenses] = useState<Expense[]>([])
    useEffect(() => {
        const setUpExpenses = async() => {
            const newExpenses: Expense[] = []
            groupExpenses.forEach(async(id) => {
                const expense = await ExpensesLocator.getGetExpenseById().execute(id)
                if(expense) {
                    newExpenses.push(expense)
                }
            })
            setExpenses(newExpenses)
        }
        setUpExpenses()
    }, [groupExpenses])

    if(expenses.length === 0) return <NoExpenses />

    return (
        <ul className={styles.expenses_list}>
            {expenses.map(expense => 
                <li 
                key={expense.id}
                className={styles.expense}
                >
                    <ExpenseCard expense={expense} />
                </li>
            )}
        </ul>
    )
}