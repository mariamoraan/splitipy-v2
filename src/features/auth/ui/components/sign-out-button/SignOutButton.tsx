import { SignOutIcon } from '@primer/octicons-react'
import { Button } from '../../../../../common/ui/components/button/Button'
import { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import styles from './SignOutButton.module.css'
import { AuthLocator } from '../../../infrastructure/di/container'

export const SignOutButton = () => {
    const { setCurrentUser } = useContext(AuthContext)
    return (
        <Button
            className={styles.sign_out_button}
            onClick={async () => {
                await AuthLocator.getSignOut().execute()
                setCurrentUser(null)
            }}
        >
            Sign Out
            <SignOutIcon />
        </Button>
    )
}
