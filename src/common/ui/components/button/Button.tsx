import styles from './Button.module.css'

interface Props {
    children: React.ReactNode
    onClick: () => void
    className?: string
}

export const Button = (props: Props) => {
    const { children, onClick, className = '' } = props
    return (
        <button
            onClick={onClick}
            className={`${styles.basic_button} ${className}`}
        >
            {children}
        </button>
    )
}
