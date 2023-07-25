import styles from './ShowList.module.scss';
import {WithChildrenProps} from "../../types/types.ts";

type Props = {

} & WithChildrenProps;
const ShowList = ({children}: Props) => {
    return (
        <div className={styles.showList}>
            {children}
        </div>
    )
}

export default ShowList;