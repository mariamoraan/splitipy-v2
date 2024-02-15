import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { GroupCard } from '@groups/ui/components/group-card/GroupCard'
import { Group } from '@groups/domain/entities/Group'
import { BrowserRouter } from 'react-router-dom'

describe('<GroupCard />', () => {
    test('Shows sign up message', async () => {
        const group: Group = {
            id: 'group-id',
            name: 'Group',
            members: [],
            expenses: [],
        }
        const GroupCardRender = render(
            <BrowserRouter>
                <GroupCard group={group} />
            </BrowserRouter>
        )
        const groupName = GroupCardRender.getByText(group.name)
        expect(groupName).toBeInTheDocument()
    })
})
