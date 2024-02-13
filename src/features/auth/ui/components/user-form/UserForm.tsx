import { useState } from 'react'
import { User } from '../../../domain/entities/User'
import styles from './UserForm.module.css'

interface Props {
    onSubmit: (user: Omit<User, 'id'>) => void
}

export const UserForm = (props: Props) => {
    const { onSubmit } = props
    const [user, setUser] = useState({ name: '' })
    const [error, setError] = useState('')

    const errorsHandler = (user: Omit<User, 'id'>): string => {
        const hasName = !!user.name
        let error = ''
        if (!hasName) error += "User name can't be void.\n"
        setError(error)
        return error
    }

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const hasErrors = !!errorsHandler(user)
        if (hasErrors) return
        await onSubmit(user)
    }
    return (
        <form className={styles.wrapper} onSubmit={onSubmitForm}>
            <fieldset>
                <legend>Name</legend>
                <input
                    type="text"
                    name="user-name"
                    id="user-name"
                    placeholder="Maria"
                    value={user.name}
                    onChange={(e) =>
                        setUser((prev) => ({ ...prev, name: e.target.value }))
                    }
                />
            </fieldset>
            <input type="submit" value="Sign Up" />
            {error ? <p className={styles.error}>{error}</p> : null}
        </form>
    )
}
