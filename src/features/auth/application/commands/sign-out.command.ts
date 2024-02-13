import { Command } from '../../../../common/infrastructure/Command'
import { AuthRepository } from '../../domain/repositories/AuthRepository'

export class SignOutCommand implements Command {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async execute() {
        await this.authRepository.signOut()
    }
}
