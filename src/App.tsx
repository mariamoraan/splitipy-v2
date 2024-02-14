import { useEffect, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { User } from './features/auth/domain/entities/User'
import { AuthContext } from './features/auth/ui/context/AuthContext'
import { AuthLocator } from './features/auth/infrastructure/di/container'
import { router } from './routes/router'

const App = () => {
    const [currentUser, setCurrentUser] = useState<User | null>(null)
    useEffect(() => {
        const checkCurrentUser = async () => {
            const user = await AuthLocator.getGetCurrentUser().execute()
            setCurrentUser(user)
        }
        checkCurrentUser()
    }, [])
    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            <RouterProvider router={router} />
        </AuthContext.Provider>
    )
}

export default App
