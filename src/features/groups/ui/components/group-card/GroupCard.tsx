import { Link } from 'react-router-dom'
import { Group } from '../../../domain/entities/Group'
import styles from './GroupCard.module.css'
import { ChevronRightIcon } from '@primer/octicons-react'
import { DEFAULT_IMAGE } from '../../../domain/constants'

interface Props {
    group: Group
}

export const GroupCard = (props: Props) => {
    const { group } = props
    return (
        <Link to={`/group/${group.id}`} className={styles.wrapper}>
            <img
                className={styles.group_image}
                src={group?.image || DEFAULT_IMAGE}
            />
            <p className={styles.group_name}>{group.name}</p>
            <ChevronRightIcon className={styles.arrow} />
        </Link>
    )
}
