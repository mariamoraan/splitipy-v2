import { useContext } from 'react'
import styles from './NoExpenses.module.css'
import { GroupContext } from '../../../../groups/ui/context/GroupContext'
import { Button } from '../../../../../common/ui/components/button/Button'

export const NoExpenses = () => {
    const { openForm } = useContext(GroupContext)
    return (
        <div className={styles.wrapper}>
            <h2>Aún no hay gastos en este grupo</h2>
            <Button onClick={openForm}>Add Expense</Button>
        </div>
    )
}
