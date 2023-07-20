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
                providesTags: (result) =>
                    result
                        ? [
                            ...result.data.map(({ id }) => ({ type: 'User' as const, id })),
                            { type: 'User', id: 'LIST' },
                        ]
                        : [{ type: 'User', id: 'LIST' }],
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                providesTags: (result, error, id) => [{type: 'User', id: id}],
                query(id) {
                    return {
                        url: `/users/${id}`,
                        method: 'GET'
                    }
                }
            }),
            updateUser: builder.mutation<IServerResponse<User>, IUpdateUserRequest>({
                invalidatesTags: [{type: 'User', id: 'LIST'}],
                query(data) {
                    return {
                        url: `/users/${data.id}`,
                        method: 'PATCH',
                        body: data
                    }
                },

                async onQueryStarted({id}, {dispatch, queryFulfilled}) {
                    const {data} = await queryFulfilled;
                    dispatch(usersApi.util.updateQueryData('getUser', id, (draft) => {
                            Object.assign(draft, data)
                    })
                    )
                }
            }),
            deleteUser: builder.mutation<void, number>({
                invalidatesTags: [{type: 'User', id: 'LIST'}],
                query(id) {
                    return {
                        url: `/users/${id}`,
                        method: 'DELETE'
                    }
                }
            }),
            createUser: builder.mutation<IServerResponse<User>, ICreateUserRequest>({
                invalidatesTags: [{type: 'User', id: 'LIST'}],
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