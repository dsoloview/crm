type TTableHeaderSelector = {
    (row: TTableRecord): any;
}

export type TTableHeader = {
    name: string;
    selector: TTableHeaderSelector,
    tableSort?: (field: string) => void;
}

export type TTableConfig = {
    rowClick?: (row: TTableRecord) => any;
    currentSort?: TTableSort;
}

export type TTableSort = {
    field: string;
    direction: 'asc' | 'desc';
}

export type TTableRecord = Record<string, any> | never