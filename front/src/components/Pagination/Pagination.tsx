import Button from "../Button/Button.tsx";
import {FC} from "react";

type Props = {
    page: number;
    perPage: number;
    lastPage: number;
    nextPage: () => void;
    prevPage: () => void;
    changePerPage: (perPage: number) => void;
}
const Pagination: FC<Props> = ({page, perPage, lastPage, nextPage, prevPage, changePerPage}) => {
    return (
        <div>
            <Button disabled={page === 1} onClick={prevPage} type={'button'}>Prev</Button>
            Page: {page}
            <Button disabled={page === lastPage} onClick={nextPage} type={'button'}>Next</Button>
            Per page: {perPage}
            <select onChange={(e) => changePerPage(Number(e.target.value))} value={perPage}>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>

        </div>
    )
}

export default Pagination;