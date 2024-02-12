import { mock } from "jest-mock-extended"
import { CreateGroupCommand } from "../application/commands/create-group.command"
import { Group } from "../domain/entities/Group"
import { GroupsRepository } from "../domain/repositories/GroupsRepository"

const setUp = () => {
    const groupsRepository = mock<GroupsRepository>()
    const createGroup = new CreateGroupCommand(groupsRepository)
    const newGroup:Omit<Group, 'id'> = {
        name: "New Group",
        members: [],
        expenses: []
    }
    return {groupsRepository, createGroup, newGroup}
}
describe('CreateGroups - LocalStorageDB', () => {
    test("The function must return a group with same characteristics as the input and an id", async() => {
        const {groupsRepository, createGroup, newGroup} = setUp()
        groupsRepository.createGroup.mockResolvedValue({...newGroup, id: 'new-group-id'})
        const res = await createGroup.execute(newGroup)
        expect(res).toEqual({...newGroup, id: 'new-group-id'})
    })
})