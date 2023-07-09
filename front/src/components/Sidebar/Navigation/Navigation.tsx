import styles from './Navigation.module.scss';
import {FC} from "react";
import classNames from "classnames";
import MenuLink from "../../MenuLink/MenuLink.tsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faUser} from "@fortawesome/free-solid-svg-icons";

type Props = {
    className?: string
}
const Navigation: FC<Props> = ({className}) => {
    const classes = classNames(styles.navigation, className);
    return (
        <nav className={classes}>
            <MenuLink title="Users" to={"users"}><FontAwesomeIcon icon={faUser} /></MenuLink>
        </nav>
    )
}

export default Navigation;