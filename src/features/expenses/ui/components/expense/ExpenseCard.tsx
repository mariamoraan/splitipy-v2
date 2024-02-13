import { CalculateDebtsQuery } from "../../../application/queries/calculate-debts.query"
import { Expense } from "../../../domain/entities/Expense"
import styles from './ExpenseCard.module.css'

interface Props {
    expense: Expense
}

export const ExpenseCard = (props: Props) => {
    const {expense} = props
    const calculatedDebts = new CalculateDebtsQuery().execute(expense)
    return (
        <div className={styles.wrapper}>
            <p className={styles.concept}>{expense.concept}</p>
            <p>Pagaron...</p>
            <ul className={styles.payers_list}>
                {expense.payers.map(payer => <li key={`${payer.name}-${payer.amount}`}><strong>{payer.name}</strong> pagó <strong>{payer.amount}</strong></li>)}
            </ul>
            <p>Deudas...</p>
            <ul className={styles.debts_list}>
                {calculatedDebts.map(
                    debt => debt.amount > 0 
                    ? <li key={debt.id}><strong>{debt.name}</strong> debe <strong>{debt.amount}€</strong></li> 
                    : <li key={debt.id}>A <strong>{debt.name}</strong> le deben <strong>{Math.abs(debt.amount)}€</strong></li>
                )}
            </ul>
        </div>
    )
}