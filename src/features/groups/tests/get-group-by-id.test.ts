import { GetGroupByIdQuery } from "../application/queries/get-group-by-id.query"
import { GroupsRepository } from "../domain/repositories/GroupsRepository"
import { GroupsLocalDBRepository } from "../infrastructure/repositories/GroupsLocalDBRepository"
import { groupsMock } from "./mocks/groups"
import { mock } from "jest-mock-extended"

const setUp = () => {
    const groupsRepository = mock<GroupsRepository>();
    const getGroupById = new GetGroupByIdQuery(groupsRepository)
    return {groupsRepository, getGroupById}
}
describe('GetGroupById - LocalStorageDB', () => {
    test("The function must return null if group does not exist", async() => {
        const {groupsRepository, getGroupById} = setUp()
        groupsRepository.getGroupById.mockResolvedValue(null)
        const res = await getGroupById.execute('unexistant-group')
        expect(res).toBe(null)
    })
    test("The function must return the specified group if it exists", async() => {
        const {groupsRepository, getGroupById} = setUp()
        const group = groupsMock[0]
        groupsRepository.getGroupById.mockResolvedValue(group)
        const res = await getGroupById.execute(group.id)
        expect(res).toEqual(group)
    })
})