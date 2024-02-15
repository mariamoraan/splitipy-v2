import { useEffect, useState } from 'react'
import { User } from '@auth/domain/entities/User'
import styles from './ExpenseForm.module.css'
import { Expense } from '../../../domain/entities/Expense'
import { Debtor } from '../../../domain/entities/Debtor'
import { Payer } from '../../../domain/entities/Payer'
import { ExpensesLocator } from '../../../infrastructure/di/container'
import { Button } from '@common/ui/components/button/Button'

interface Props {
    members: User[]
    onCreateExpense: (expense: Expense) => void
}

interface Participant {
    user: User
    amount: number
    isParticipant: boolean
}

export const ExpenseForm = (props: Props) => {
    const { members, onCreateExpense } = props
    const [concept, setConcept] = useState('')
    const [participants, setParticipants] = useState<Participant[]>([])
    const [error, setError] = useState('')

    useEffect(() => {
        setParticipants(
            members.map((member) => ({
                user: member,
                amount: 0,
                isParticipant: true,
            }))
        )
    }, [members.length])

    const orderParticipants = (
        participantA: Participant,
        participantB: Participant
    ) => {
        if (participantA.user.name > participantB.user.name) return 1
        else return -1
    }

    const setParticipant = (participant: Participant) => {
        setParticipants((prev) => [
            ...prev.filter(({ user }) => user.id !== participant.user.id),
            participant,
        ])
    }
    const getPayers = (participants: Participant[]): Payer[] => {
        return participants
            .filter(
                (participant) =>
                    participant.amount > 0 && participant.isParticipant
            )
            .map(({ amount, user }) => ({
                id: user.id,
                name: user.name,
                amount,
            }))
    }
    const getDebtors = (participants: Participant[]): Debtor[] => {
        return participants
            .filter(
                (participant) =>
                    participant.amount <= 0 && participant.isParticipant
            )
            .map(({ amount, user }) => ({
                id: user.id,
                name: user.name,
                amount,
            }))
    }

    const handleErrors = (): string => {
        let errors = ''
        if (!concept) errors += 'El pago debe tener un concepto\n'
        if (getPayers(participants).length === 0)
            errors += 'Debe haberse realizado algún pago para crear un gasto\n'
        setError(errors)
        return errors
    }

    const generateExpense = async () => {
        if (handleErrors()) return
        const expense: Omit<Expense, 'id'> = {
            concept,
            payers: getPayers(participants),
            debtors: getDebtors(participants),
            date: new Date(),
        }
        const createExpense = ExpensesLocator.getCreateExpense()
        const newExpense: Expense = await createExpense.execute(expense)
        onCreateExpense(newExpense)
    }
    return (
        <div className="wrapper">
            <div className={styles.concept_input}>
                <label htmlFor="expense-concept">Concepto</label>
                <input
                    id="expense-concept"
                    name="expense-concept"
                    type="text"
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                />
            </div>
            <ul className={styles.members_list}>
                {participants
                    .sort((a, b) => orderParticipants(a, b))
                    .map((participant) => (
                        <li key={participant.user.id} className={styles.member}>
                            <input
                                type="checkbox"
                                checked={participant.isParticipant}
                                onChange={() =>
                                    setParticipant({
                                        ...participant,
                                        isParticipant:
                                            !participant.isParticipant,
                                    })
                                }
                            />
                            {participant.user.name}
                            <input
                                type="number"
                                value={participant.amount}
                                onChange={(e) =>
                                    setParticipant({
                                        ...participant,
                                        amount: parseFloat(e.target.value),
                                    })
                                }
                            />
                            €
                        </li>
                    ))}
            </ul>
            <Button onClick={generateExpense}>Create Expense</Button>
            {error ? <p className={styles.error}>{error}</p> : null}
        </div>
    )
}
