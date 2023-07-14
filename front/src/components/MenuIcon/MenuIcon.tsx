import styles from './MenuIcon.module.scss';
import {FC} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {IconProp} from "@fortawesome/fontawesome-svg-core";

type Props = {
    icon: IconProp
}
const MenuIcon: FC<Props> = ({icon}) => {
    return (
            <FontAwesomeIcon
                className={styles.icon}
                icon={icon}
            />
    )
}

export default MenuIcon;