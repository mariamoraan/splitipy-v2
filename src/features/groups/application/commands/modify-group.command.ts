import { Command } from '../../../../common/infrastructure/Command'
import { Group } from '../../domain/entities/Group'
import { GroupsRepository } from '../../domain/repositories/GroupsRepository'

export class ModifyGroupCommand implements Command<Group, Group> {
    private groupsRepository: GroupsRepository

    constructor(groupsRepository: GroupsRepository) {
        this.groupsRepository = groupsRepository
    }

    async execute(group: Group): Promise<Group> {
        const modifiedGroup = await this.groupsRepository.modifyGroup(group)
        return modifiedGroup
    }
}
