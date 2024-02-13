import { BookmarkIcon, PlusIcon } from '@primer/octicons-react'
import { Group } from '../../../domain/entities/Group'
import { GroupCard } from '../group-card/GroupCard'
import styles from './GroupsList.module.css'
import { Button } from '../../../../../common/ui/components/button/Button'

interface Props {
    setDisplayForm: (displayForm: boolean) => void
    groups: Group[]
}

export const GroupsList = (props: Props) => {
    const { setDisplayForm, groups } = props
    return (
        <div className={styles.wrapper}>
            <div className={styles.header}>
                <BookmarkIcon size={32} className={styles.icon} />
                <h2 className={styles.title}>Groups</h2>
                <Button
                    className={styles.new_group_button}
                    onClick={() => setDisplayForm(true)}
                >
                    <PlusIcon />
                    Nuevo Grupo
                </Button>
            </div>
            <ul className={styles.groups_list}>
                {groups.map((group) => (
                    <li key={group.id}>
                        <GroupCard group={group} />
                    </li>
                ))}
            </ul>
        </div>
    )
}
