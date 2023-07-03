import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../types/auth.ts";

const authApi = createApi({
    reducerPath: 'auth',
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
            })
        }
    }
})

export const { useLoginMutation, useRegisterMutation }  = authApi;
export {authApi};
