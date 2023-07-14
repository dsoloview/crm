import {FC} from "react";
import styles from './Sidebar.module.scss';
import bigLogo from '../../assets/images/bigLogo.svg';
import Navigation from "./Navigation/Navigation.tsx";
import Control from "./Control/Control.tsx";
import classNames from "classnames";
import {Link} from "react-router-dom";

type Props = {
    className?: string
}
const Sidebar: FC<Props> = ({className}) => {

    const classes = classNames(styles.sidebar, className);
    return (
        <aside className={classes}>
            <div className={styles.sidebar__top}>
                <Link to={'/'}><img src={bigLogo} alt="logo"/></Link>
                <Navigation className={styles.navigation} />
            </div>
            <Control className={styles.control} />
        </aside>
    )
}

export default Sidebar;