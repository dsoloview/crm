import {api} from "./api.ts";
import {AuthResponse, LoginRequest, RegisterRequest} from "../../types/auth.ts";
import {ILogoutResponse, IServerResponse} from "../../types/responses.ts";
import {User} from "../../types/Models/User/model.ts";

const authApi = api.injectEndpoints({
    endpoints(builder) {
        return {
            login: builder.mutation<AuthResponse, LoginRequest>({
                query(data: LoginRequest) {
                    return {
                        url: '/auth/login',
                        method: 'POST',
                        body: data
                    }
                }
            }),
            register: builder.mutation<AuthResponse, RegisterRequest>({
                query(data: RegisterRequest) {
                    return {
                        url: '/auth/register',
                        method: 'POST',
                        body: data
                    }
                }
            }),
            logout: builder.mutation<ILogoutResponse ,void>({
                query() {
                    return {
                        url: '/auth/logout',
                        method: 'POST'
                    }
                }
            }),
            getAuthUser: builder.query<IServerResponse<User>, void>({
                query() {
                    return {
                        url: '/auth/user',
                        method: 'GET'
                    }
                }
            }),
        }
    }
})

export const { useLoginMutation, useRegisterMutation, useGetAuthUserQuery, useLogoutMutation, useLazyGetAuthUserQuery }  = authApi;
export { authApi }