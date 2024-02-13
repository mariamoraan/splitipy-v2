import { Group } from '../../domain/entities/Group'
import { GroupsRepository } from '../../domain/repositories/GroupsRepository'
import { Command } from '../../../../common/infrastructure/Command'

// TODO: configure prettier, eslint and git hooks
export class CreateGroupCommand implements Command<Omit<Group, 'id'>, Group> {
    private groupsRepository: GroupsRepository

    constructor(groupsRepository: GroupsRepository) {
        this.groupsRepository = groupsRepository
    }

    async execute(group: Omit<Group, 'id'>): Promise<Group> {
        const newGroup = await this.groupsRepository.createGroup(group)
        return newGroup
    }
}
