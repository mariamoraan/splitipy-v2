import { CalculateDebtsSummary } from "../../../application/calculate-debts-summary"
import { Expense } from "../../../domain/entities/Expense"
import styles from './Summary.module.css'

interface Props {
    expenses: Expense[]
}

export const Summary = (props: Props) => {
    const {expenses} = props
    const calculateDebtsSummary = new CalculateDebtsSummary()
    const summary = calculateDebtsSummary.execute(expenses) 

    return (
        <div className={styles.wrapper}>   
            <h2>Summary</h2>
            {Object.values(summary).map(debtor => (
                debtor.amount > 0
                ? <p>{debtor.name} debe {debtor.amount}€</p>
                : <p>A {debtor.name} le deben {Math.abs(debtor.amount)}€</p>
            ))}
        </div>
    )
}