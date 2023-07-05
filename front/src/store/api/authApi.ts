import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../types/auth.ts";
import {User} from "../../types/models.ts";

const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/auth'
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
            getUser: builder.query<User, void>({
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

export const { useLoginMutation, useRegisterMutation, useGetUserQuery }  = authApi;
export {authApi};
