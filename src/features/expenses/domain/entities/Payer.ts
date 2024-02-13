import { UserId } from '../../../auth/domain/entities/UserId'

export interface Payer {
    id: UserId
    amount: number
    name: string
}
