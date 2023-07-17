type TTableHeaderSelector<T> = {
    (row: TTableRecord<T>): any;
}

export type TTableHeader<T> = {
    name: string;
    field?: keyof T;
    selector: TTableHeaderSelector<T>,
    tableSort?: (field: keyof T) => void;
}

export type TTableConfig<T> = {
    rowClick?: (row: TTableRecord<T>) => void;
    currentSort?: TTableSort<T>;
}

export type TTableSort<T> = {
    field: keyof T
    direction: 'asc' | 'desc';
}


export type TTableRecord<T> = Record<keyof T, unknown> | never
