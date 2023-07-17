import {useState} from "react";
import {TTableSort} from "../../types/Table/table.types.ts";

const useSort = <T,>(defaultSort: TTableSort<T>) => {
    const [currentSort, setCurrentSort] = useState<TTableSort<T>>(defaultSort);

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
        currentSort,
        defaultTableSort
    }
}

export default useSort;