import styles from './MailLayout.module.scss';
import {WithChildrenProps} from "../../types/types.ts";
import {FC} from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";

const MainLayout: FC<WithChildrenProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar />
            {children}
        </div>
    )
}

export default MainLayout;