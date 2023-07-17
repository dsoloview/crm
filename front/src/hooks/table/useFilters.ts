import {useState} from "react";
import {FieldValues, useForm} from "react-hook-form";

const useFilters = <T extends FieldValues,>(changePage?: (page: number) => void) => {
    const [filters, setFilters] = useState<T>({} as T);
    const {register, handleSubmit, reset} = useForm<T>();

    function handleFiltersSubmit(data: T) {
        setFilters(data);
        if (changePage) {
            changePage(1);
        }

    }

    function onFiltersReset() {
        reset();
        setFilters({} as T);
    }

    const onFiltersSubmit = handleSubmit(handleFiltersSubmit);


    return {
        filters,
        register,
        onFiltersSubmit,
        onFiltersReset
    }
}

export default useFilters;