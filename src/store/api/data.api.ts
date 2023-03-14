import {BaseQueryFn, createApi, FetchArgs, fetchBaseQuery} from '@reduxjs/toolkit/query/react';
import { ITask } from "models/models";

interface IError {
    data: {
        massage: string;
    };
    status: number;
}


export const taskApi = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3000/api',
        prepareHeaders: (headers, { getState }: { getState: () => any }) => {
            // By default, if we have a token in the store, let's use that for authenticated requests
            const token = getState().auth.token;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }) as BaseQueryFn<string | FetchArgs, unknown, IError, {}>, 
    keepUnusedDataFor: 1,
    tagTypes: ['Task'],
    endpoints: build =>({
        getTasks: build.query<ITask[], void>({
            query: () => ({
                url: `/tasks`,
            }),
            providesTags: ['Task']
        }),
        getTask: build.query<ITask, string>({
            query: (id) => ({
                url: `/tasks/${id}`,
            }),
            providesTags: ['Task']
        }),
        addTask: build.mutation<ITask, ITask>({
            query: (task) => ({
                url: `/tasks`,
                method: 'POST',
                body: {
                    ...task
                }
            }),
            invalidatesTags: ['Task']
        }),
        updateTask: build.mutation<void, ITask >({
            query: (task) => ({
                url: `/tasks/${task.id}`,
                method: 'PUT',
                body: {
                    ...task
                }
            }),
            invalidatesTags: ["Task"]
        }),
        removeTask: build.mutation<void, number>({
            query: (id) => ({
                url: `/tasks/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Task']
        })
      
    })
});


export const { 
    useGetTasksQuery,
    useGetTaskQuery,
    useLazyGetTaskQuery,
    useAddTaskMutation,
    useUpdateTaskMutation,
    useRemoveTaskMutation,
 } = taskApi;
