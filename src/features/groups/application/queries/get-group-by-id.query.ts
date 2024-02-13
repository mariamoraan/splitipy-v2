import { Query } from '../../../../common/infrastructure/Query'
import { Group } from '../../domain/entities/Group'
import { GroupsRepository } from '../../domain/repositories/GroupsRepository'

export class GetGroupByIdQuery implements Query<Group | null, string> {
    private groupsRepository: GroupsRepository

    constructor(groupsRepository: GroupsRepository) {
        this.groupsRepository = groupsRepository
    }

    async execute(id: string): Promise<Group | null> {
        const group = await this.groupsRepository.getGroupById(id)
        return group
    }
}
