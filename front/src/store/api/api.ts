import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootStore} from "../store.ts";

const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api',
        prepareHeaders: async (headers, {getState}) => {
            const token = (getState() as RootStore).auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }

            return headers;
        }
    }),
    endpoints: () => ({})
})


export { api };