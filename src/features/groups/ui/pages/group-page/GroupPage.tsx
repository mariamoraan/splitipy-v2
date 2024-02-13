import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Group } from '../../../domain/entities/Group';
import { GroupHeader } from '../../components/group-header/GroupHeader';
import { GroupContext } from '../../context/GroupContext';
import { ExpensesList } from '../../../../expenses/ui/components/expenses-list/ExpensesList';
import { CreateExpenseModal } from '../../../../expenses/ui/components/create-expense-modal/CreateExpenseModal';
import { VOID_GROUP } from '../../../domain/constants';
import { Summary } from '../../../../expenses/ui/components/summary/Summary';
import { Expense } from '../../../../expenses/domain/entities/Expense';
import styles from './GroupPage.module.css'
import { ExpensesLocator } from '../../../../expenses/infrastructure/di/container';
import { GroupsLocator } from '../../../infrastructure/di/container';

export const GroupPage = () => {
    const params = useParams()
    const groupId = params.groupId
    const [group, setGroup] = useState<Group|null>({...VOID_GROUP})
    const [isFormOpen, setIsFormOpen] = useState(false)
    const [expenses, setExpenses] = useState<Expense[]>([])

    useEffect(() => {
        const setUpGroup = async() => {
            if(!groupId) return
            setGroup(await GroupsLocator.getGetGroupById().execute(groupId))
        }
        setUpGroup()
    }, [groupId])

    useEffect(() => {
        const setUpExpenses = async() => {
            const fullExpenses: Expense[] = []
            group?.expenses.forEach(async(expense) => {
                const e = await ExpensesLocator.getGetExpenseById().execute(expense)
                if(e) {
                    fullExpenses.push(e)
                }
            })
            setExpenses(fullExpenses)
        }
        setUpExpenses()
    }, [group?.expenses])

    if(!group) return (
        <h1>Group not found</h1>
    )

    const closeForm = () => setIsFormOpen(false)
    const openForm = () => setIsFormOpen(true)

    return (
        <GroupContext.Provider value={{
            group, 
            setGroup,
            isFormOpen, 
            openForm,
            closeForm,
            }}>
            <div className={styles.wrapper}>
                <GroupHeader />
                {expenses.length > 0 ? <Summary expenses={expenses} /> : null}
                <ExpensesList groupExpenses={expenses} />
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