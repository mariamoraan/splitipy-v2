import { useContext, useEffect, useState } from 'react'
import { Group } from '../../../domain/entities/Group'
import styles from './GroupForm.module.css'
import { User } from '@auth/domain/entities/User'
import { AuthContext } from '@auth/ui/context/AuthContext'
import { XIcon } from '@primer/octicons-react'
import { MultipleSelector } from '@common/ui/components/multiple-selector/MultipleSelector'
import { Option } from '@common/ui/components/multiple-selector/MultipleSelector'
import { Button } from '@common/ui/components/button/Button'
import { VOID_GROUP_WITHOUT_ID } from '../../../domain/constants'
import { AuthLocator } from '@auth/infrastructure/di/container'
import { GroupsLocator } from '../../../infrastructure/di/container'

interface Props {
    displayForm: boolean
    setDisplayForm: (displayForm: boolean) => void
    setGroups: (groups: Group[]) => void
    groups: Group[]
    closeForm: () => void
}

export const GroupForm = (props: Props) => {
    const { displayForm, setDisplayForm, setGroups, groups, closeForm } = props
    const { currentUser } = useContext(AuthContext)
    const [group, setGroup] = useState<Omit<Group, 'id'>>({
        ...VOID_GROUP_WITHOUT_ID,
    })
    const [error, setError] = useState('')

    const [users, setUsers] = useState<User[]>([])

    useEffect(() => {
        const getFriends = async () => {
            const friends = await AuthLocator.getGetUsers().execute()
            setUsers(friends)
        }
        getFriends()
    }, [])

    const onSubmit = async () => {
        const errors = handleErrors()
        if (errors) return
        const newGroup = await GroupsLocator.getCreateGroup().execute(group)
        setGroups([...groups, newGroup])
        closeForm()
    }

    const handleErrors = () => {
        let errors = ''
        if (!group.name) errors += 'Group name can not be void\n'
        if (group.members.length < 2)
            errors += 'There must be at least 2 members in the group\n'
        setError(errors)
        return errors
    }

    const createValue = async (option: Option): Promise<Option | null> => {
        const user = await AuthLocator.getGetUserById().execute(option.value)
        if (!user) {
            const newUser = await AuthLocator.getCreateUser().execute({
                name: option.value,
            })
            return { label: newUser.name, value: newUser.id, isFixed: false }
        }
        return { label: user.name, value: user.id, isFixed: false }
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <h2>New Group</h2>
                <button
                    className={styles.close_button}
                    onClick={() => setDisplayForm(!displayForm)}
                >
                    <XIcon size={24} />
                </button>
            </div>
            <div className={styles.group_form}>
                <fieldset>
                    <legend>Datos del grupo</legend>
                    <label>Nombre del grupo</label>
                    <input
                        type="text"
                        name="group-name"
                        id="group-name"
                        placeholder="Viaje Tenerife"
                        value={group.name}
                        onChange={(e) =>
                            setGroup((prev) => ({
                                ...prev,
                                name: e.target.value,
                            }))
                        }
                    />
                    <label>Image URL</label>
                    <input
                        type="text"
                        name="group-image"
                        id="group-image"
                        placeholder="https://..."
                        value={group.image}
                        onChange={(e) =>
                            setGroup((prev) => ({
                                ...prev,
                                image: e.target.value,
                            }))
                        }
                    />
                </fieldset>
                <MultipleSelector
                    id="group_members"
                    options={users
                        .filter((user) => user.id !== currentUser?.id)
                        .map(({ id, name }) => ({
                            value: id,
                            label: name,
                            isFixed: false,
                        }))}
                    createValue={createValue}
                    fixedItems={
                        currentUser
                            ? [
                                  {
                                      label: currentUser.name,
                                      value: currentUser.id,
                                      isFixed: true,
                                  },
                              ]
                            : []
                    }
                    updateSelection={(items: Option[]) =>
                        setGroup((prev) => ({
                            ...prev,
                            members: items.map(({ value }) => value),
                        }))
                    }
                />
                <Button onClick={onSubmit}>Create Group</Button>
            </div>
            {error ? <p className={styles.error}>{error}</p> : null}
        </div>
    )
}
