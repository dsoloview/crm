import styles from './Navigation.module.scss';
import {FC} from "react";
import classNames from "classnames";
import MenuLink from "../../MenuLink/MenuLink.tsx";
import {faUser, faHome} from "@fortawesome/free-solid-svg-icons";
import MenuIcon from "../../MenuIcon/MenuIcon.tsx";

type Props = {
    className?: string
}
const Navigation: FC<Props> = ({className}) => {
    const classes = classNames(styles.navigation, className);
    return (
        <nav className={classes}>
            <MenuLink title="Home" to={"/"}><MenuIcon icon={faHome} /></MenuLink>
            <MenuLink title="Users" to={"/users"}><MenuIcon icon={faUser} /></MenuLink>
        </nav>
    )
}

export default Navigation;