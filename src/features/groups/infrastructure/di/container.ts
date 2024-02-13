import { localDB } from '../../../../common/infrastructure/instances'
import { CreateGroupCommand } from '../../application/commands/create-group.command'
import { GetGroupByIdQuery } from '../../application/queries/get-group-by-id.query'
import { GetGroupsQuery } from '../../application/queries/get-groups.query'
import { ModifyGroupCommand } from '../../application/commands/modify-group.command'
import { GroupsLocalDBRepository } from '../repositories/GroupsLocalDBRepository'

export class GroupsLocator {
    static repository = new GroupsLocalDBRepository(localDB)

    static getCreateGroup() {
        return new CreateGroupCommand(this.repository)
    }
    static getGetGroups() {
        return new GetGroupsQuery(this.repository)
    }
    static getGetGroupById() {
        return new GetGroupByIdQuery(this.repository)
    }
    static getModifyGroup() {
        return new ModifyGroupCommand(this.repository)
    }
}
