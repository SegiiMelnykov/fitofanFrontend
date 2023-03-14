import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { setupListeners } from '@reduxjs/toolkit/query';


import { taskApi } from "store/api/data.api";

import { authApi } from "./auth/auth.api";
import { authReducer } from "./auth/auth.slice";



export const store = configureStore( {
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        auth: authReducer,
        [taskApi.reducerPath]: taskApi.reducer

    },
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(authApi.middleware, taskApi.middleware),
        
})


setupListeners(store.dispatch)
export type RootState = ReturnType<typeof store.getState>


