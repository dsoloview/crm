import {TTableConfig, TTableHeader} from "../../types/Table/table.types.ts";


type TUseTableResult<T> = {
    createHeaders: (headers: TTableHeader<T>[]) => TTableHeader<T>[];
    createConfig: (config: TTableConfig<T>) => TTableConfig<T>;
}
export const useTable = <T,>(): TUseTableResult<T> => {
    const createHeaders = (headers: TTableHeader<T>[]) => {
        return headers;
    }

    const createConfig = (config: TTableConfig<T>) => {
        return config;
    }

    return {
        createHeaders,
        createConfig
    }
}