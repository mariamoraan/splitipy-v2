import { User } from '../../../auth/domain/entities/User'

export type Balance = {
    from: User
    to: User
    amount: number
}
