import { Query } from "../../../../common/infrastructure/Query";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

export class GetUsersQuery implements Query<User[]> {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async execute(): Promise<User[]> {
        const user = await this.authRepository.getUsers()
        return user
    }
}