import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    loading: false,
    user: {},
    token: null,
    error: null,
    success: false,

}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

    },
    extraReducers(builder) {

    }
})

export const authReducer = authSlice.reducer;
