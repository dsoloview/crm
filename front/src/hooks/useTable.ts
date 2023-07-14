import {TTablePagination, TTableSort} from "../types/Table/table.types.ts";
import {useState} from "react";
import {usePagination} from "./usePagination.ts";


type IUseTable<T> = {
    sort: {
        defaultSort: TTableSort<T>
    },
    pagination: TTablePagination
}
export const useTable = <T,>({sort, pagination}: IUseTable<T>) => {
    const [currentSort, setCurrentSort] = useState<TTableSort<T>>(sort.defaultSort);
    const {currentPage, perPage, changePage, changePerPage, nextPage, prevPage} = usePagination(pagination.page, pagination.perPage);

    const defaultTableSort = (field: keyof T) => {
        setCurrentSort(prev => {
            if (prev.field === field) {
                return {
                    field,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc'
                }
            }

            return {
                field,
                direction: 'asc'
            }
        })
    }

    return {
        sort: {
            currentSort,
            defaultTableSort
        },
        pagination: {
            currentPage,
            perPage,
            changePage,
            changePerPage,
            nextPage,
            prevPage
        }
    }
}