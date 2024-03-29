import styles from './MailLayout.module.scss';
import {WithChildrenProps} from "../../types/types.ts";
import {FC} from "react";
import Sidebar from "../../components/Sidebar/Sidebar.tsx";
import Topbar from "../../components/Topbar/Topbar.tsx";
import Breadcrumbs from "../../components/Breadcrumbs/Breadcrumbs.tsx";

const MainLayout: FC<WithChildrenProps> = ({ children }) => {
    return (
        <div className={styles.layout}>
            <Sidebar className={styles.sidebar} />
            <div className={styles.container}>
                <Topbar className={styles.topbar} />
                <Breadcrumbs className={styles.breadcrumbs} />
                {children}
            </div>
        </div>
    )
}

export default MainLayout;