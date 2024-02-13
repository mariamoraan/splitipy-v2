import { mock } from 'jest-mock-extended'
import { GetGroupByIdQuery } from '../application/queries/get-group-by-id.query'
import { ModifyGroupCommand } from '../application/commands/modify-group.command'
import { GroupsLocalDBRepository } from '../infrastructure/repositories/GroupsLocalDBRepository'
import { groupsMock } from './mocks/groups'

const setUp = () => {
    const groupsRepository = mock<GroupsLocalDBRepository>()
    const getGroupById = new GetGroupByIdQuery(groupsRepository)
    const modifyGroup = new ModifyGroupCommand(groupsRepository)
    return { groupsRepository, getGroupById, modifyGroup }
}

describe('GetGroups - LocalStorageDB', () => {
    test('The function must modify a group', async () => {
        const { getGroupById, modifyGroup, groupsRepository } = setUp()
        const selectedGroup = groupsMock[0]

        groupsRepository.getGroupById.mockResolvedValue(selectedGroup)
        const group = await getGroupById.execute(selectedGroup.id)

        if (!group) return

        groupsRepository.modifyGroup.mockResolvedValue({
            ...group,
            name: 'New name',
        })
        const modifiedGroup = await modifyGroup.execute({
            ...group,
            name: 'New name',
        })
        expect(modifiedGroup).toEqual({ ...group, name: 'New name' })
    })
})
