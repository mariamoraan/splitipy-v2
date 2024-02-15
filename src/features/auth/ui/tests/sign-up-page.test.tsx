import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { SignUpPage } from '../pages/sign-up-page/SignUpPage'
import { AuthContext } from '../context/AuthContext'
import { User } from '@auth/domain/entities/User'

describe('<SignUpCard />', () => {
    test('Shows sign up message', async () => {
        const SignUpRender = render(
            <BrowserRouter>
                <AuthContext.Provider
                    value={{
                        currentUser: null,
                        setCurrentUser: (user: User | null) =>
                            console.log(user),
                    }}
                >
                    <SignUpPage />
                </AuthContext.Provider>
            </BrowserRouter>
        )
        const signupTexts = await SignUpRender.findAllByText('Sign Up')
        expect(signupTexts).toHaveLength(2)
    })
})
