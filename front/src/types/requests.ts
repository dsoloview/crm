import {TTableSort} from "./Table/table.types.ts";

export interface IIdRequest {
    id: string
}

export interface ITableRequest<T> {
    sort?: TTableSort<T>;
    filters?: Partial<Record<keyof T, any>>;
    page?: number;
    perPage?: number;
}