import styles from './TableHeaderCell.module.scss';
import {FC} from "react";
import classNames from "classnames";
import {TTableConfig} from "../../../types/Table/table.types.ts";

type Props = {
    tableSort?: (field: string) => void;
    children: string;
    config?: TTableConfig;
};
const TableHeaderCell: FC<Props> = ({children, tableSort, config}) => {
    function handleSort() {
        if (tableSort) {
            tableSort(children.toLowerCase());
        }
    };

    const cellClasses = classNames(styles.tableHeaderCell,{
        [styles.tableHeaderCell__sort]: tableSort,
    });

    let sortIcon = null;
    console.log(config?.currentSort);
    if (tableSort) {
        if (config?.currentSort?.field === children.toLowerCase()) {
            if (config?.currentSort?.direction === 'asc') {
                sortIcon = 'Up'
            } else {
                sortIcon = 'Down'
            }
        }
    }

    return (
        <th onClick={handleSort} className={cellClasses}>
            <div className={styles.tableHeaderCell__content}>
                <div className={styles.tableHeaderCell__name}>
                    {children}
                </div>
                {sortIcon}
            </div>
        </th>
    )
}

export default TableHeaderCell;