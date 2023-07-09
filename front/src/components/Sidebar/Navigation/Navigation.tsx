import styles from './Navigation.module.scss';
import {FC} from "react";
import classNames from "classnames";

type Props = {
    className?: string
}
const Navigation: FC<Props> = ({className}) => {
    const classes = classNames(styles.navigation, className);
    return (
        <nav className={classes}>
            <div>First</div>
            <div>Second</div>
            <div>Third</div>
        </nav>
    )
}

export default Navigation;