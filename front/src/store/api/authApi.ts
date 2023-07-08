import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../types/auth.ts";
import {User} from "../../types/models.ts";
import {RootStore} from "../store.ts";
import {ILogoutResponse, IServerResponse} from "../../types/types.ts";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:8000/api/auth',
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
            login: builder.mutation<AuthResponse, LoginRequest>({
                query(data: LoginRequest) {
                    return {
                        url: '/login',
                        method: 'POST',
                        body: data
                    }
                }
            }),
            register: builder.mutation<AuthResponse, RegisterRequest>({
                query(data: RegisterRequest) {
                    return {
                        url: '/register',
                        method: 'POST',
                        body: data
                    }
                }
            }),
            logout: builder.mutation<ILogoutResponse ,void>({
               query() {
                   return {
                       url: '/logout',
                       method: 'POST'
                   }
               }
            }),
            getUser: builder.query<IServerResponse<User>, void>({
                query() {
                    return {
                        url: '/user',
                        method: 'GET'
                    }
                }
            }),
        }
    }
})

export const { useLoginMutation, useRegisterMutation, useGetUserQuery, useLogoutMutation }  = authApi;
export {authApi};
