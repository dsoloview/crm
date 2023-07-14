import styles from './Control.module.scss';
import {FC} from "react";
import classNames from "classnames";
import Logout from "../../Logout/Logout.tsx";

type Props = {
    className?: string
}
const Control: FC<Props> = ({className}) => {
    const classes = classNames(styles.control, className);

    return (
        <div className={classes}>
            <Logout />
        </div>
    )
}

export default Control;