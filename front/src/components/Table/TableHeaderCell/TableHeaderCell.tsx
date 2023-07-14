import styles from './TableHeaderCell.module.scss';
import {FC} from "react";
import {WithChildrenProps} from "../../../types/types.ts";

type Props = {
    hasSort?: boolean
} & WithChildrenProps;
const TableHeaderCell: FC<Props> = ({children, hasSort}) => {
    return (
        <th className={styles.tableHeaderCell}>
            <div className={styles.tableHeaderCell__content}>
                <div className={styles.tableHeaderCell__name}>
                    {children}
                </div>
                {hasSort && (
                    <div className={styles.tableHeaderCell__sort}>
                        <div className={styles.tableHeaderCell__sortIcon}>
                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.00033 0.333496L1.66699 3.66683H8.33366L5.00033 0.333496ZM5.00033 9.66683L8.33366 6.3335H1.66699L5.00033 9.66683Z"
                                    fill="#C4C4C4"/>
                            </svg>
                        </div>
                    </div>
                )}
            </div>
        </th>
    )
}

export default TableHeaderCell;