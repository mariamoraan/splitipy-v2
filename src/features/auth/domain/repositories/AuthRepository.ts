import { User } from '../entities/User'

export interface AuthRepository {
    signUp: (user: Omit<User, 'id'>) => Promise<User>
    signOut: () => void
    getUsers: () => Promise<User[]>
    getUserById: (id: string) => Promise<User | null>
    createUser: (user: Omit<User, 'id'>) => Promise<User>
    getCurrentUser: () => Promise<User | null>
}
