import { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'

export const ProtectedRoutes = () => {
    const { currentUser } = useContext(AuthContext)

    if (!currentUser) {
        return <Navigate to="/signup" />
    }

    return <Outlet />
}
