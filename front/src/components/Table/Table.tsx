import styles from './Table.module.scss';
import TableHeaderCell from "./TableHeaderCell/TableHeaderCell.tsx";
import TableRow from "./TableRow/TableRow.tsx";
import {TTableHeader, TTableConfig} from "../../types/Table/table.types.ts";

type Props<T> = {
    headers: TTableHeader<T>[];
    data: T[];
    config: TTableConfig<T>;
}

const Table = <T extends Record<string, any>,>({headers, data, config}: Props<T>) => {
    const renderedHeaders = headers.map((header) => {
        return (
            <TableHeaderCell<T>
                key={header.name}
                config={config}
                tableSort={header.tableSort}
            >
                {header}
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