import Button from "../Button/Button.tsx";
import {FC} from "react";
import classNames from "classnames";
import styles from './Pagination.module.scss';
import Select from "../Form/Selects/Select/Select.tsx";

type Props = {
    page: number;
    perPage: number;
    lastPage: number;
    nextPage: () => void;
    prevPage: () => void;
    changePerPage: (perPage: number) => void;
    className?: string;
}
const Pagination: FC<Props> = ({page, lastPage, nextPage, prevPage, perPage, changePerPage, className}) => {
    const classes = classNames(styles.container, className);
    return (
        <div className={classes}>
            <div className={styles.pagination}>
                <Button disabled={page === 1} onClick={prevPage} type={'button'}>Prev</Button>
                Page: {page}
                <Button disabled={page === lastPage} onClick={nextPage} type={'button'}>Next</Button>
            </div>
            <div className={styles.perPage}>
                Per page:
                <Select className={styles.select} value={perPage} name="perPage"  onChange={(e) => changePerPage(Number(e.target.value))}>
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                </Select>
            </div>
        </div>
    )
}

export default Pagination;