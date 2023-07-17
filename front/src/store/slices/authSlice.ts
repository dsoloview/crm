import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../types/Models/User/model.ts";
import {api} from "../api/api.ts";

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
            api.endpoints.login.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                localStorage.setItem('token', state.token)
            },
        ),
        builder.addMatcher(
            api.endpoints.register.matchFulfilled,
            (state, { payload }) => {
                state.token = payload.token;
                state.user = payload.user;
                localStorage.setItem('token', state.token)
            },
        ),
        builder.addMatcher(
            api.endpoints?.getUser.matchFulfilled,
            (state, {payload}) => {
                state.user = payload.data
            }
        ),
        builder.addMatcher(
            api.endpoints?.getUser.matchRejected,
            (state) => {
                state.user = undefined;
                state.token = undefined;
                localStorage.removeItem('token')
            }
        ),
        builder.addMatcher(
            api.endpoints?.logout.matchFulfilled,
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
