import { AddExpenseButton } from '../add-expense-button/AddExpenseButton'
import styles from './NoExpenses.module.css'

export const NoExpenses = () => {
    return (
        <div className={styles.wrapper}>
            <h2>Aún no hay gastos en este grupo</h2>
            <AddExpenseButton />
        </div>
    )
}
