import React, { useEffect, useState } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { SignUpPage } from './features/auth/ui/pages/sign-up-page/SignUpPage'
import { AuthRedirect } from './features/auth/ui/components/AuthRedirect'
import { GroupsPage } from './features/groups/ui/pages/groups-page/GroupsPage'
import { User } from './features/auth/domain/entities/User'
import { AuthContext } from './features/auth/ui/context/AuthContext'
import { GroupPage } from './features/groups/ui/pages/group-page/GroupPage'
import { AuthLocator } from './features/auth/infrastructure/di/container'

// TODO - Implementarlo como childrens de AuthRedirect

const router = createBrowserRouter([
    {
        path: '/signup',
        element: (
            <AuthRedirect>
                <SignUpPage />
            </AuthRedirect>
        ),
    },
    {
        path: '/groups',
        element: (
            <AuthRedirect>
                <GroupsPage />
            </AuthRedirect>
        ),
    },
    {
        path: '/group/:groupId',
        element: (
            <AuthRedirect>
                <GroupPage />
            </AuthRedirect>
        ),
    },
    {
        path: '*',
        element: (
            <AuthRedirect>
                <GroupsPage />
            </AuthRedirect>
        ),
    },
])

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
