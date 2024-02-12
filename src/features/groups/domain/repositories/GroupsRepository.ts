import { Group } from "../entities/Group";

export interface GroupsRepository {
    getGroups: () => Promise<Group[]>,
    createGroup: (group: Omit<Group, 'id'>) => Promise<Group>,
    getGroupById: (id: string) => Promise<Group | null>,
    modifyGroup: (group: Group) => Promise<Group>
}