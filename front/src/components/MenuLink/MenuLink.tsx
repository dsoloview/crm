import styles from './MenuLink.module.scss';
import {FC} from "react";
import {Link, useLocation} from "react-router-dom";
import {WithChildrenProps} from "../../types/types.ts";
import classNames from "classnames";

type Props = {
    to: string
    title?: string
} & WithChildrenProps;
const MenuLink: FC<Props> = ({to, children, title}) => {
    const location = useLocation();

    function checkLocation(): boolean {
        if (location.pathname === '/' && to === '/') {
            return true;
        }

        if (location.pathname !== '/' && to !== '/') {
            return location.pathname.includes(to);
        }

        return false;
    }

    const classes = classNames(styles.link, {
        [styles.active]: checkLocation()
    });
    return (
        <Link className={classes} to={to}>
            {children}{title && ` ${title}`}
        </Link>
    );
}

export default MenuLink;