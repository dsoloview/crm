import styles from './TableHeaderCell.module.scss';
import classNames from "classnames";
import {TTableConfig, TTableHeader} from "../../../types/Table/table.types.ts";

type Props<T> = {
    tableSort?: (field: keyof T) => void;
    children: TTableHeader<T>;
    config?: TTableConfig<T>;
};
const TableHeaderCell = <T,>({children, tableSort, config}: Props<T>) => {
    function handleSort() {
        if (tableSort) {
            tableSort(children.field as keyof T);
        }
    };

    const cellClasses = classNames(styles.tableHeaderCell,{
        [styles.tableHeaderCell__sort]: tableSort,
    });

    let sortIcon = null;
    console.log(config?.currentSort);
    if (tableSort) {
        if (config?.currentSort?.field === children.field) {
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
                    {children.name}
                </div>
                {sortIcon}
            </div>
        </th>
    )
}

export default TableHeaderCell;