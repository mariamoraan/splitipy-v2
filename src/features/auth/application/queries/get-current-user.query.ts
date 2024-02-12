
import { Query } from "../../../../common/infrastructure/Query";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

export class GetCurrentUserQuery implements Query<User | null> {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async execute(): Promise<User | null> {
        const user = await this.authRepository.getCurrentUser()
        return user
    }
}