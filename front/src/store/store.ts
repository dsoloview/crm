import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authReducer} from "./slices/authSlice.ts";
import {useDispatch} from "react-redux";
import {api} from "./api/api.ts";

const store = configureStore({
   reducer: {
      [api.reducerPath]: api.reducer,
      auth: authReducer
   },
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
          .concat(api.middleware)
   }
});

setupListeners(store.dispatch);

export type RootStore = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store;
