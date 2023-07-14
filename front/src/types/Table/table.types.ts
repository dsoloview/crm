type TTableHeaderSelector = {
    (row: TTableRecord): any;
}

export type TTableHeader = {
    name: string;
    selector: TTableHeaderSelector,
    hasSort?: boolean;
}

export type TTableConfig = {
    rowClick?: (row: TTableRecord) => any;
}

export type TTableRecord = Record<string, any> | never