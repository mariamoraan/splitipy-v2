import { useContext } from 'react'
import { SignOutButton } from '../../../../auth/ui/components/sign-out-button/SignOutButton'
import styles from './GroupsHeader.module.css'
import { AuthContext } from '../../../../auth/ui/context/AuthContext'

export const GroupsHeader = () => {
    const { currentUser } = useContext(AuthContext)
    return (
        <header className={styles.wrapper}>
            <p className={styles.welcome_text}>
                Hi, <strong>{currentUser?.name}</strong>
            </p>
            <SignOutButton />
        </header>
    )
}
