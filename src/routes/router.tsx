import { createBrowserRouter } from 'react-router-dom'
import { ProtectedRoutes } from '@auth/ui/components/ProtectedRoutes'
import { SignUpPage } from '@auth/ui/pages/sign-up-page/SignUpPage'
import { GroupPage } from '@groups/ui/pages/group-page/GroupPage'
import { GroupsPage } from '@groups/ui/pages/groups-page/GroupsPage'

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
