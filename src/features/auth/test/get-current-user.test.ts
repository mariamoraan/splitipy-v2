import { GetCurrentUserQuery } from '../application/queries/get-current-user.query'
import { User } from '@auth/domain/entities/User'
import { AuthRepository } from '@auth/domain/repositories/AuthRepository'
import { mock } from 'jest-mock-extended'

const setUp = () => {
    const authRepository = mock<AuthRepository>()
    const getCurrentUser = new GetCurrentUserQuery(authRepository)
    return { authRepository, getCurrentUser }
}

describe('CreateUserCommand', () => {
    test('Must return a user with the same values as the input and with an id', async () => {
        const { authRepository, getCurrentUser } = setUp()
        const user: User = { name: 'Maria', id: 'user-id' }
        authRepository.getCurrentUser.mockResolvedValue(user)
        const authenticatedUser = await getCurrentUser.execute()
        expect(authenticatedUser).toEqual(user)
    })
})
