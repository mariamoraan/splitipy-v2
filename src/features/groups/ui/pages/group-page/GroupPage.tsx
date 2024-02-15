import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { VOID_GROUP } from '@groups/domain/constants'
import { Group } from '@groups/domain/entities/Group'
import { GroupContext } from '@groups/ui/context/GroupContext'
import { GroupsLocator } from '@groups/infrastructure/di/container'
import { GroupHeader } from '@groups/ui/components/group-header/GroupHeader'
import { Expense } from '@expenses/domain/entities/Expense'
import { ExpensesLocator } from '@expenses/infrastructure/di/container'
import { ExpensesList } from '@expenses/ui/components/expenses-list/ExpensesList'
import { CreateExpenseModal } from '@expenses/ui/components/create-expense-modal/CreateExpenseModal'
import styles from './GroupPage.module.css'

export const GroupPage = () => {
    const params = useParams()
    const groupId = params.groupId
    const [group, setGroup] = useState<Group | null>({ ...VOID_GROUP })
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        const setUpGroup = async () => {
            if (!groupId) return
            const requestedGroup =
                await GroupsLocator.getGetGroupById().execute(groupId)
            if (!requestedGroup) return
            const fullExpenses: Expense[] = []
            for (const expense of requestedGroup.expenses) {
                const requestedExpense =
                    await ExpensesLocator.getGetExpenseById().execute(expense)
                if (requestedExpense !== null)
                    fullExpenses.push(requestedExpense)
            }
            setGroup(requestedGroup)
            setExpenses(fullExpenses)
        }
        setUpGroup()
    }, [groupId, group?.expenses.length])

    if (!group) return <h1>Group not found</h1>

    const closeForm = () => setIsFormOpen(false)
    const openForm = () => setIsFormOpen(true)

    return (
        <GroupContext.Provider
            value={{
                group,
                setGroup,
                isFormOpen,
                openForm,
                closeForm,
            }}
        >
            <div className={styles.wrapper}>
                <GroupHeader />
                <ExpensesList expenses={expenses} />
                <CreateExpenseModal
                    group={group}
                    setGroup={setGroup}
                    isOpen={isFormOpen}
                    close={closeForm}
                />
            </div>
        </GroupContext.Provider>
    )
}
