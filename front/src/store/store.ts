import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authReducer} from "./slices/authSlice.ts";
import {useDispatch} from "react-redux";
import {authApi} from "./api/authApi.ts";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer,
      auth: authReducer
   },
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
          .concat(authApi.middleware)
   }
});

setupListeners(store.dispatch);

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
