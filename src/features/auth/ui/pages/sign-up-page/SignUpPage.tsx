import { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { UserForm } from '../../components/user-form/UserForm'
import { User } from '../../../domain/entities/User'
import styles from './SignUpPage.module.css'
import { AuthContext } from '../../context/AuthContext'
import { AuthLocator } from '../../../infrastructure/di/container'

export const SignUpPage = () => {
    const { currentUser, setCurrentUser } = useContext(AuthContext)

    if (currentUser !== null) return <Navigate to="/groups" />

    const onSignUp = async (user: Omit<User, 'id'>) => {
        const newUser = await AuthLocator.getSignUp().execute(user)
        setCurrentUser(newUser)
    }

    return (
        <div className={styles.wrapper}>
            <h1>Sign Up</h1>
            <UserForm onSubmit={onSignUp} />
        </div>
    )
}
