import { Balance } from '../../../domain/entities/Balance'
import styles from './BalanceCard.module.css'

interface Props {
    balance: Balance[]
}

export const BalanceCard = (props: Props) => {
    const { balance } = props
    return (
        <div className={styles.wrapper}>
            <h2>Balance</h2>
            {balance.map(({ from, to, amount }) => (
                <p key={`${from.id}-${to.id}-${amount}`}>
                    {from.name} debe a {to.name} {amount} €
                </p>
            ))}
        </div>
    )
}
