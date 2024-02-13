import { useContext, useEffect } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { AuthContext } from "../context/AuthContext"
import { AuthLocator } from "../../infrastructure/di/container"

interface Props {
    children: React.ReactNode
}

export const AuthRedirect = (props: Props) => {
    const {children} = props
    const {currentUser} = useContext(AuthContext)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const checkCurrentUser = async() => {
            const user = await AuthLocator.getGetCurrentUser().execute()
            if(location.pathname !== 'signup' && !user) {
                navigate('/signup')
            } 
            if(location.pathname === 'signup' && user) {
                navigate('/groups')
            } 
        }
        checkCurrentUser()
    }, [navigate, currentUser])

    return (
        <>{children}</>
    )
}