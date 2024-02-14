import { Balance } from '../../../domain/entities/Balance'
import styles from './BalanceCard.module.css'

interface Props {
    balance: Balance
}

export const BalanceCard = (props: Props) => {
    const { balance } = props
    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Balance</h2>
            {balance.map(({ from, to, amount }) => (
                <div
                    className={styles.balance}
                    key={`${from.id}-${to.id}-${amount}`}
                >
                    <strong className={styles.person}>{from.name}</strong>
                    <div className={styles.amount_wrapper}>
                        <span className={styles.arrow_left_side}></span>
                        <strong className={styles.amount}>{amount} €</strong>
                        <span className={styles.arrow_right_side}></span>
                    </div>
                    <strong className={styles.person}>{to.name}</strong>
                </div>
            ))}
        </div>
    )
}
