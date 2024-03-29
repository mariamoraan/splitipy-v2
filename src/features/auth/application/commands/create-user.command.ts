import { Command } from '../../../../common/infrastructure/Command'
import { User } from '../../domain/entities/User'
import { AuthRepository } from '../../domain/repositories/AuthRepository'

export class CreateUserCommand implements Command<Omit<User, 'id'>, User> {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async execute(user: Omit<User, 'id'>): Promise<User> {
        const newUser = await this.authRepository.createUser(user)
        return newUser
    }
}
