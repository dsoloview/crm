import {IPaginatedServerResponse, IServerResponse} from "../../types/responses.ts";
import {User} from "../../types/Models/User/model.ts";
import {ICreateUserRequest, IUpdateUserRequest} from "../../types/Models/User/requests.ts";
import {ITableRequest} from "../../types/requests.ts";
import {makeQueryParamsForTable} from "../../utils/queryParamsHelpers.ts";
import {api} from "./api.ts";

const usersApi = api.injectEndpoints({
    endpoints(builder) {
        return {
            getUsers: builder.query<IPaginatedServerResponse<User[]>, ITableRequest<User>>({
                query(arg) {
                    const params = makeQueryParamsForTable<User>(arg);
                    if (params.length > 0) {
                        return {
                            url: `/users?${params}`,
                            method: 'GET'
                        }
                    }
                    return {
                        url: '/users',
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

export const { useGetUsersQuery, useLazyGetUserQuery, useLazyGetUsersQuery, useGetUserQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation }  = usersApi;
export {usersApi};