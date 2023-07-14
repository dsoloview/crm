import styles from './MenuLink.module.scss';
import {FC} from "react";
import {Link} from "react-router-dom";
import {WithChildrenProps} from "../../types/types.ts";

type Props = {
    to: string
    title?: string
} & WithChildrenProps;
const MenuLink: FC<Props> = ({to, children, title}) => {
    return (
        <Link className={styles.link} to={to}>
            {children}{title && ` ${title}`}
        </Link>
    );
}

export default MenuLink;