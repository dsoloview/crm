import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query";
import {authApi} from "./api/authApi.ts";

const store = configureStore({
   reducer: {
      [authApi.reducerPath]: authApi.reducer
   },
   middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware()
          .concat(authApi.middleware)
   }
});

setupListeners(store.dispatch);

export default store;
