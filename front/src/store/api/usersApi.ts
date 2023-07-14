import {createApi} from "@reduxjs/toolkit/query/react";
import {fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {RootStore} from "../store.ts";
import {IPaginatedServerResponse, IServerResponse} from "../../types/responses.ts";
import {User} from "../../types/User/model.ts";
import {ICreateUserRequest, IUpdateUserRequest} from "../../types/User/requests.ts";
import {TTableSort} from "../../types/Table/table.types.ts";

const usersApi = createApi({
    reducerPath: 'users',
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
    endpoints(builder) {
        return {
            getUsers: builder.query<IPaginatedServerResponse<User[]>, {sort: TTableSort<User>, page: number, perPage: number}>({
                query(arg) {
                    const {field, direction} = arg.sort;
                    const page = arg.page;
                    const perPage = arg.perPage;
                    const params = new URLSearchParams();
                    params.set('sort', field);
                    params.set('direction', direction);
                    params.set('page', page.toString());
                    params.set('per_page', perPage.toString());
                    return {
                        url: `/users?${params.toString()}`,
                        method: 'GET'
                    }
                }
            }),
            getUser: builder.query<IServerResponse<User>, number>({
                query(id) {
                    return {
                        url: `/users/${id}`,
                        method: 'GET'
                    }
                }
            }),
            updateUser: builder.mutation<IServerResponse<User>, IUpdateUserRequest>({
                query(data) {
                    return {
                        url: `/users/${data.id}`,
                        method: 'PATCH',
                        body: data
                    }
                }
            }),
            deleteUser: builder.mutation<void, number>({
                query(id) {
                    return {
                        url: `/users/${id}`,
                        method: 'DELETE'
                    }
                }
            }),
            createUser: builder.mutation<IServerResponse<User>, ICreateUserRequest>({
                query(data) {
                    return {
                        url: `/users`,
                        method: 'POST',
                        body: data
                    }
                }
            }),
        }
    }
});

export const { useGetUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation }  = usersApi;
export {usersApi};