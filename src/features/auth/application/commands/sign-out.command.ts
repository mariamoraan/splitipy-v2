import { AuthRepository } from "../../domain/repositories/AuthRepository";

export class SignOutCommand {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async execute() {
        await this.authRepository.signOut()
    }
}