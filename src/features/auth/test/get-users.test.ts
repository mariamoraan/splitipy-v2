import { GetUsersQuery } from '../application/queries/get-users.query'
import { User } from '@auth/domain/entities/User'
import { AuthRepository } from '@auth/domain/repositories/AuthRepository'
import { mock } from 'jest-mock-extended'

const setUp = () => {
    const authRepository = mock<AuthRepository>()
    const getUsers = new GetUsersQuery(authRepository)
    return { authRepository, getUsers }
}

describe('CreateUserCommand', () => {
    test('Must return a user with the same values as the input and with an id', async () => {
        const { authRepository, getUsers } = setUp()
        const users: User[] = [
            { name: 'User 1', id: 'user-1' },
            { name: 'User 2', id: 'user-2' },
        ]
        authRepository.getUsers.mockResolvedValue(users)
        const findUsers = await getUsers.execute()
        expect(findUsers).toEqual(users)
    })
})
