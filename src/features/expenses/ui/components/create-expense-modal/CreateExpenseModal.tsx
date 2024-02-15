import { useEffect, useState } from 'react'
import { User } from '@auth/domain/entities/User'
import { AuthLocator } from '@auth/infrastructure/di/container'
import { Expense } from '@expenses/domain/entities/Expense'
import { ExpenseForm } from '@expenses/ui/components/expense-form/ExpenseForm'
import styles from '@expenses/ui/components/create-expense-modal/CreateExpenseModal.module.css'
import { Group } from '@groups/domain/entities/Group'
import { GroupsLocator } from '@groups/infrastructure/di/container'
import { XIcon } from '@primer/octicons-react'

interface Props {
    group: Group
    setGroup: (group: Group) => void
    isOpen: boolean
    close: () => void
}

export const CreateExpenseModal = (props: Props) => {
    const { group, setGroup, isOpen, close } = props
    const [members, setMembers] = useState<User[]>([])
    const updateGroup = async (newGroup: Group) => {
        await GroupsLocator.getModifyGroup().execute(newGroup)
        setGroup(newGroup)
    }
    useEffect(() => {
        const setUpMembers = async () => {
            const groupMembers: User[] = []
            group.members.forEach(async (memberId) => {
                const member =
                    await AuthLocator.getGetUserById().execute(memberId)
                if (member) groupMembers.push(member)
            })
            setMembers(groupMembers)
        }
        setUpMembers()
    }, [group.members])

    const onCreateExpense = async (expense: Expense) => {
        await updateGroup({
            ...group,
            expenses: [...group.expenses, expense.id],
        })
        close()
    }

    return (
        <div
            className={`${styles.wrapper} ${!isOpen ? styles.hidden_form : ''}`}
        >
            <div className={styles.modal_header}>
                <h2>New Expense</h2>
                <button className={styles.close_button} onClick={close}>
                    <XIcon size={24} />
                </button>
            </div>
            <ExpenseForm members={members} onCreateExpense={onCreateExpense} />
        </div>
    )
}
