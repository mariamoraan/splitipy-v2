import { CalculateDebts } from "../../../application/calculate-debts"
import { Expense } from "../../../domain/entities/Expense"
import styles from './ExpenseCard.module.css'

interface Props {
    expense: Expense
}

export const ExpenseCard = (props: Props) => {
    const {expense} = props
    const calculatedDebts = new CalculateDebts().execute(expense)
    return (
        <div className={styles.wrapper}>
            <p className={styles.concept}>{expense.concept}</p>
            <p>Pagaron...</p>
            <ul className={styles.payers_list}>
                {expense.payers.map(payer => <li><strong>{payer.name}</strong> pagó <strong>{payer.amount}</strong></li>)}
            </ul>
            <p>Deudas...</p>
            <ul className={styles.debts_list}>
                {calculatedDebts.map(
                    debt => debt.amount > 0 
                    ? <li><strong>{debt.name}</strong> debe <strong>{debt.amount}€</strong></li> 
                    : <li>A <strong>{debt.name}</strong> le deben <strong>{Math.abs(debt.amount)}€</strong></li>
                )}
            </ul>
        </div>
    )
}