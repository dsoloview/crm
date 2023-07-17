import React from "react";
import {WithChildrenProps} from "../../../types/types.ts";
import styles from './TableFilters.module.scss';
import Button from "../../Button/Button.tsx";

type Props = {
    onFiltersSubmit: (e: React.FormEvent<HTMLFormElement>) => void
    onFiltersReset: () => void
} & WithChildrenProps;
const TableFilters = ({onFiltersSubmit, children, onFiltersReset}: Props) => {
    function resetFilters() {
        onFiltersReset();
    }
    return (
        <form className={styles.form} onSubmit={onFiltersSubmit}>
            {children}
            <div className={styles.buttonsContainer}>
                <Button type="submit">Filter</Button>
                <Button type="button" onClick={resetFilters}>Reset</Button>
            </div>
        </form>
    )
}

export default TableFilters;