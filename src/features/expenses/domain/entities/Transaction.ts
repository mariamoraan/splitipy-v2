import { User } from '@auth/domain/entities/User'

export interface Transaction {
    from: User
    to: User
    amount: number
}
