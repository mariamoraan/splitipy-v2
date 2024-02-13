import { ChevronLeftIcon } from '@primer/octicons-react'
import { DEFAULT_IMAGE } from '../../../domain/constants'
import styles from './GroupHeader.module.css'
import { Link } from 'react-router-dom'
import { Button } from '../../../../../common/ui/components/button/Button'
import { useContext } from 'react'
import { GroupContext } from '../../context/GroupContext'

export const GroupHeader = () => {
    const { group, openForm } = useContext(GroupContext)
    const { name, image } = group
    return (
        <div className={styles.wrapper}>
            <Link to="/groups" className={styles.go_back_button}>
                <ChevronLeftIcon size={32} />
            </Link>
            <img className={styles.group_image} src={image || DEFAULT_IMAGE} />
            <h1 className={styles.group_name}>{name}</h1>
            <Button onClick={openForm}>Add Expense</Button>
        </div>
    )
}
