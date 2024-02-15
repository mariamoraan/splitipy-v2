import { CreateUserCommand } from '../application/commands/create-user.command'
import { User } from '@auth/domain/entities/User'
import { AuthRepository } from '@auth/domain/repositories/AuthRepository'
import { mock } from 'jest-mock-extended'

const setUp = () => {
    const authRepository = mock<AuthRepository>()
    const createUser = new CreateUserCommand(authRepository)
    return { authRepository, createUser }
}

describe('CreateUserCommand', () => {
    test('Must return a user with the same values as the input and with an id', async () => {
        const { authRepository, createUser } = setUp()
        const user: Omit<User, 'id'> = { name: 'Maria' }
        const userId = '1'
        authRepository.createUser.mockResolvedValue({ ...user, id: userId })
        const newUser = await createUser.execute(user)
        expect({ ...user, id: userId }).toEqual(newUser)
    })
})
