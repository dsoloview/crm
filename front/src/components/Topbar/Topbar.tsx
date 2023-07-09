import styles from './Topbar.module.scss';
import {FC} from "react";
import classNames from "classnames";
import Search from "../Search/Search.tsx";
import {useSelector} from "react-redux";
import {RootStore} from "../../store/store.ts";

type Props = {
    className?: string
}

const Topbar: FC<Props> = ({className}) => {

    const {user} = useSelector((state: RootStore) => state.auth);
    const classes = classNames(styles.topbar, className);
    return (
        <div className={classes}>
            <Search />
            <div>Hello {user?.name}</div>
        </div>
    )
}

export default Topbar;