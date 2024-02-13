import { createContext } from 'react'
import { Group } from '../../domain/entities/Group'
import { VOID_GROUP } from '../../domain/constants'

export const GroupContext = createContext<{
    group: Group
    setGroup: (group: Group) => void
    isFormOpen: boolean
    closeForm: () => void
    openForm: () => void
}>({
    group: { ...VOID_GROUP },
    setGroup: (group: Group) => group,
    isFormOpen: false,
    closeForm: () => null,
    openForm: () => null,
})
