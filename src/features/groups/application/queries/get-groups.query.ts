import { Query } from "../../../../common/infrastructure/Query"
import { Group } from "../../domain/entities/Group"
import { GroupsRepository } from "../../domain/repositories/GroupsRepository"


export class GetGroupsQuery implements Query<Group[]> {
    private groupsRepository: GroupsRepository

    constructor(groupsRepository: GroupsRepository) {
        this.groupsRepository = groupsRepository
    }

    async execute(): Promise<Group[]> {
        const groups = await this.groupsRepository.getGroups()
        return groups
    }
}