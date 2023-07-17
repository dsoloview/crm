import {ITableRequest} from "../types/requests.ts";

export function makeQueryParamsForTable<T>(params: ITableRequest<T>) {
    const {sort, page, perPage, filters} = params;
    const paramQuery = new URLSearchParams();

    if (sort) {
        paramQuery.set('sort', sort.field as string);
        paramQuery.set('direction', sort.direction);
    }

    if (page) {
        paramQuery.set('page', page.toString());
    }

    if (perPage) {
        paramQuery.set('per_page', perPage.toString());
    }

    if (filters && Object.keys(filters).length > 0) {
        Object.entries(filters).forEach(([key, value]) => {
            if (value === null || value === undefined || value === '') {
                return;
            }

            paramQuery.set(`filters[${key}]`, value.toString());
        })
    }

    return paramQuery.toString();
}