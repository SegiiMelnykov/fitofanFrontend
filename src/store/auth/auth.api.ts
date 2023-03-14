import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

interface IError {
    data: {
        massage: string;
    };
    status: number;
}


export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api/user'
    }) as BaseQueryFn<string | FetchArgs, unknown, IError, {}>, 
    keepUnusedDataFor: 1,
    endpoints: build =>({
        registration: build.mutation<any, any>({
            query: (body) => ({
                url: `/registration`,
                method: 'POST',
                body
            }),
        }),
        login: build.mutation<any, any>({
            query: (body) => ({
                url: `/login`,
                method: 'POST',
                body
            }),
        }),
        auth: build.query<any, void>({
            query: () => ({
                url: `/auth`,
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authorization': localStorage.getItem('token') ? `Bearer ${JSON.parse(localStorage.getItem('token') ?? '')}` : '',  
                }
            }),
        }),
    })
    
})

export const { useLoginMutation, useRegistrationMutation, useAuthQuery } = authApi;