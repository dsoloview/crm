import styles from './ShowListItem.module.scss';

type Props = {
    name: string
    value: string
}

const ShowListItem = ({name, value}: Props) => {
    return (
        <div className={styles.shownListItem}>
            <span className={styles.name}>{name}:</span>
            <span className={styles.value}>{value}</span>
        </div>
    )
}

export default ShowListItem;

