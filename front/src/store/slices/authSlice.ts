import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {authApi} from "../api/authApi.ts";
import {User} from "../../types/User/model.ts";

type State = {
    user: User | undefined
    token: string | undefined
}
const initialState: State = {
    user: undefined,
    token: localStorage.getItem('token') ?? undefined
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
            localStorage.setItem('token', action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addMatcher(
            authApi.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                localStorage.setItem('token', state.token)
            },
        ),
        builder.addMatcher(
            authApi.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                localStorage.setItem('token', state.token)
            },
        ),
        builder.addMatcher(
            authApi.endpoints?.getUser.matchFulfilled,
            (state, {payload}) => {
                state.user = payload.data
            }
        ),
        builder.addMatcher(
            authApi.endpoints?.getUser.matchRejected,
            (state) => {
                state.user = undefined;
                state.token = undefined;
                localStorage.removeItem('token')
            }
        ),
        builder.addMatcher(
            authApi.endpoints?.logout.matchFulfilled,
            (state) => {
                state.user = undefined;
                state.token = undefined;
                localStorage.removeItem('token')
            }
        )
}
})

export const {setToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
