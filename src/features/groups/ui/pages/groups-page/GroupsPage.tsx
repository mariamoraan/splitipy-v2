import { useEffect, useState } from 'react'
import { GroupForm } from '../../components/group-form/GroupForm'
import { GroupsHeader } from '../../components/groups-header/GroupsHeader'
import { GroupsList } from '../../components/groups-list/GroupsList'
import styles from './GroupsPage.module.css'
import { Group } from '../../../domain/entities/Group'
import { GroupsLocator } from '../../../infrastructure/di/container'

export const GroupsPage = () => {
    const [displayForm, setDisplayForm] = useState(false)
    const [groups, setGroups] = useState<Group[]>([])

    useEffect(() => {
        const queryGroups = async () => {
            setGroups(await GroupsLocator.getGetGroups().execute())
        }
        queryGroups()
    }, [])

    return (
        <div className={styles.wrapper}>
            <GroupsHeader />
            <div className={styles.content}>
                <GroupsList setDisplayForm={setDisplayForm} groups={groups} />
                {displayForm ? (
                    <GroupForm
                        setDisplayForm={setDisplayForm}
                        displayForm={displayForm}
                        setGroups={setGroups}
                        groups={groups}
                        closeForm={() => setDisplayForm(false)}
                    />
                ) : null}
            </div>
        </div>
    )
}
