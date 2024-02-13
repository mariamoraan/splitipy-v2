import { Group } from '../../domain/entities/Group'
import { GroupsRepository } from '../../domain/repositories/GroupsRepository'
import { v4 as uuidv4 } from 'uuid'
import { LocalDB } from '../../../../common/domain/LocalDB'

export class GroupsLocalDBRepository implements GroupsRepository {
    private groupsKey = 'GROUPS'

    constructor(private localDB: LocalDB) {}

    modifyGroup = async (group: Group): Promise<Group> => {
        const groups = await this.getGroups()
        const newGroups = groups.map((g) => (g.id !== group.id ? g : group))
        await this.localDB.setItem(this.groupsKey, JSON.stringify(newGroups))
        return group
    }
    getGroupById = async (id: string) => {
        const groups = await this.getGroups()
        return groups.find((group) => group.id === id) || null
    }
    getGroups = async () => {
        const groups: Group[] = JSON.parse(
            (await this.localDB.getItem(this.groupsKey)) || '[]'
        )
        return groups
    }
    createGroup = async (group: Omit<Group, 'id'>) => {
        const groups = await this.getGroups()
        const newGroup = { ...group, id: uuidv4() }
        await this.localDB.setItem(
            this.groupsKey,
            JSON.stringify([...groups, newGroup])
        )
        return newGroup
    }
}
