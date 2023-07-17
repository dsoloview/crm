import {useState} from "react";

type TUsePaginationResult = {
    currentPage: number
    perPage: number
    changePage: (page: number) => void
    changePerPage: (perPage: number) => void
    nextPage: () => void
    prevPage: () => void
}
export const usePagination = (initialPage: number, initialPerPage: number): TUsePaginationResult => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [perPage, setPerPage] = useState<number>(initialPerPage);

    const changePage = (page: number) => {
        setCurrentPage(page);
    }

    const changePerPage = (perPage: number) => {
        console.log(perPage);
        setPerPage(perPage);
    }

    const nextPage = () => {
        setCurrentPage(prev => prev + 1);
    }

    const prevPage = () => {
        setCurrentPage(prev => prev - 1);
    }

    return {
        currentPage,
        perPage,
        changePage,
        changePerPage,
        nextPage,
        prevPage
    }
}