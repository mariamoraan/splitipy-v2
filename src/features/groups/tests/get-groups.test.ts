import { mock } from "jest-mock-extended"
import { GetGroupsQuery } from "../application/queries/get-groups.query"
import { GroupsRepository } from "../domain/repositories/GroupsRepository"
import { groupsMock } from "./mocks/groups"

const setUp = () => {
    const groupsRepository = mock<GroupsRepository>()
    const getGroups = new GetGroupsQuery(groupsRepository)
    return {groupsRepository, getGroups}
}
describe('GetGroups - LocalStorageDB', () => {
    
    test("The function must return the groups in local", async() => {
        const {getGroups, groupsRepository} = setUp()
        groupsRepository.getGroups.mockResolvedValue(groupsMock)
        const groups = await getGroups.execute()
        expect(groups).toEqual(groupsMock)
    })
})