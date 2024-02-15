import { Button } from '@common/ui/components/button/Button'
import { GroupContext } from '@groups/ui/context/GroupContext'
import { PlusIcon } from '@primer/octicons-react'
import { useContext } from 'react'
import styles from './AddExpenseButton.module.css'

export const AddExpenseButton = () => {
    const { openForm } = useContext(GroupContext)
    return (
        <Button onClick={openForm} className={styles.add_expense_button}>
            <PlusIcon />
            Add Expense
        </Button>
    )
}
