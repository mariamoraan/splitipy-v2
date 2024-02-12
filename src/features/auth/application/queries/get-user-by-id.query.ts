import { Query } from "../../../../common/infrastructure/Query";
import { User } from "../../domain/entities/User";
import { AuthRepository } from "../../domain/repositories/AuthRepository";

export class GetUserByIdQuery implements Query<User | null, string> {
    private authRepository: AuthRepository

    constructor(authRepository: AuthRepository) {
        this.authRepository = authRepository
    }

    async execute(id: string): Promise<User | null> {
        const user = await this.authRepository.getUserById(id)
        return user
    }
}