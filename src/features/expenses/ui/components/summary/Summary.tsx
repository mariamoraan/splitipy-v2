import { CalculateDebtsSummaryQuery } from "../../../application/queries/calculate-debts-summary.query"
import { Expense } from "../../../domain/entities/Expense"
import styles from './Summary.module.css'

interface Props {
    expenses: Expense[]
}

export const Summary = (props: Props) => {
    const {expenses} = props
    const calculateDebtsSummary = new CalculateDebtsSummaryQuery()
    const summary = calculateDebtsSummary.execute(expenses) 

    return (
        <div className={styles.wrapper}>   
            <h2>Summary</h2>
            {Object.values(summary).map(debtor => (
                debtor.amount > 0
                ? <p key={debtor.id}>{debtor.name} debe {debtor.amount}€</p>
                : <p key={debtor.id}>A {debtor.name} le deben {Math.abs(debtor.amount)}€</p>
            ))}
        </div>
    )
}