import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from '../features/auth/ui/components/ProtectedRoutes'
import { SignUpPage } from '../features/auth/ui/pages/sign-up-page/SignUpPage'
import { GroupPage } from '../features/groups/ui/pages/group-page/GroupPage'
import { GroupsPage } from '../features/groups/ui/pages/groups-page/GroupsPage'

export const router = createBrowserRouter([
    { path: '/signup', element: <SignUpPage /> },
    {
        element: <ProtectedRoutes />,
        children: [
            { path: '/group/:groupId', element: <GroupPage /> },
            { path: '/groups', element: <GroupsPage /> },
            { path: '*', element: <GroupsPage /> },
        ],
    },
])
