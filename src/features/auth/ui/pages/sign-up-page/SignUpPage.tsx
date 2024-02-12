import { useNavigate } from "react-router-dom"
import { UserForm } from "../../components/user-form/UserForm"
import { User } from "../../../domain/entities/User"
import { useContext, useEffect } from "react"
import styles from './SignUpPage.module.css'
import { AuthContext } from "../../context/AuthContext"
import { AuthLocator } from "../../../infrastructure/di/container"

export const SignUpPage = () => {
    const navigate = useNavigate()
    const {currentUser, setCurrentUser} = useContext(AuthContext)

    useEffect(() => {
        if(currentUser !== null) navigate('/groups')
    }, [navigate, currentUser])

    const onSignUp = async(user: Omit<User, 'id'>) => {
        const newUser = await AuthLocator.getSignUp().execute(user)
        setCurrentUser(newUser)
    }
    
    return (
        <div className={styles.wrapper}>
            <h1>Sign Up</h1>
            <UserForm
                onSubmit={onSignUp}
            />
        </div>
    )
}

