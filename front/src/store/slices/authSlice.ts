import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {User} from "../../types/models.ts";
import {authApi} from "../api/authApi.ts";

type State = {
    user: User | null
    token: string | null
}
const initialState: State = {
    user: null,
    token: null,
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload
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
        )
        builder.addMatcher(
            authApi.endpoints?.getUser.matchFulfilled,
            (state, {payload}) => {
                state.user = payload
            }
        )
}
})

export const {setToken} = authSlice.actions;
export const authReducer = authSlice.reducer;
