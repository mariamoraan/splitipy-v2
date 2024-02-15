import { UserId } from '@auth/domain/entities/UserId'

export interface Debtor {
    id: UserId
    amount: number
    name: string
}
