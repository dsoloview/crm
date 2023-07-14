import styles from './Table.module.scss';
import TableHeaderCell from "./TableHeaderCell/TableHeaderCell.tsx";
import TableRow from "./TableRow/TableRow.tsx";
import {TTableHeader, TTableConfig, TTableRecord} from "../../types/Table/table.types.ts";

type Props<T> = {
    headers: TTableHeader[];
    data: T[];
    config: TTableConfig;
}

const Table = <T extends TTableRecord,>({headers, data, config}: Props<T>) => {
    const renderedHeaders = headers.map((header) => {
        return (
            <TableHeaderCell
                key={header.name}
                config={config}
                tableSort={header.tableSort}
            >
                {header.name}
            </TableHeaderCell>
        )
    })

    const renderedBody = data.map((item) => {
        return (
            <TableRow<T>
                key={item.id}
                headers={headers}
                row={item}
                rowClick={config.rowClick}
            />
        )
    });

    return (
        <table className={styles.table}>
            <thead className={styles.header}>
                <tr>
                    {renderedHeaders}
                </tr>
            </thead>
            <tbody>
            {renderedBody}
            </tbody>
        </table>
    )
}

export default Table;