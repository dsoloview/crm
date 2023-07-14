export interface IServerResponse<T> {
    data: T,
}
export interface IPaginatedServerResponse<T> extends IServerResponse<T> {
    links: ResponseLinks
    meta: ResponseMeta
    path: string,
    per_page: number,
    to: number,
    total: number
}

interface ResponseLinks {
    first: string | null
    last: string | null,
    prev: string | null,
    next: string | null
}

interface ResponseMetaLink {
    url: string | null,
    label: string,
    active: boolean
}

interface ResponseMeta {
    current_page: number,
    from: number,
    last_page: number,
    links: ResponseMetaLink[],
}

export interface ILogoutResponse {
    message: 'Logged out'
}