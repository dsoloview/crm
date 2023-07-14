import styles from './TableRow.module.scss';
import {TTableHeader, TTableRecord} from "../../../types/Table/table.types.ts";
import classNames from "classnames";

type Props<T> = {
    headers: TTableHeader<T>[];
    row: T;
    rowClick?: (row: TTableRecord<T>) => void;
}
const TableRow = <T,>({ headers, row, rowClick }: Props<T>) => {
    function handleRowClick() {
        if (rowClick) {
            rowClick(row);
        }
    }
    const cellClasses = classNames(styles.cell, {
        [styles.clickable]: !!rowClick,
    });
    const renderedRow = headers .map((header) => {
        return (
            <td className={cellClasses} onClick={handleRowClick} key={header.name}>{header.selector(row)}</td>
        )
    });

    return (
        <tr className={styles.row}>
                {renderedRow}
        </tr>
    );
}

export default TableRow;