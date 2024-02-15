import { UserId } from '@auth/domain/entities/UserId'
import { ExpenseId } from '@expenses/domain/entities/ExpenseId'

type GroupId = string

export interface Group {
    id: GroupId
    name: string
    members: UserId[]
    expenses: ExpenseId[]
    image?: string
}
