import {useState} from "react";

export const usePagination = (initialPage: number, initialPerPage: number) => {
    const [currentPage, setCurrentPage] = useState<number>(initialPage);
    const [perPage, setPerPage] = useState<number>(initialPerPage);

    const changePage = (page: number) => {
        setCurrentPage(page);
    }

    const changePerPage = (perPage: number) => {
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