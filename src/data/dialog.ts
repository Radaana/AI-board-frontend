// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import type {ICreateDialog, IDialog} from "../model/dialog.ts";

// Define a service using a base URL and expected endpoints
export const dialogApi = createApi({
    reducerPath: 'dialogApi',
    baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
    tagTypes: ['Dialogs'],
    endpoints: (builder) => ({
        getDialogs: builder.query<IDialog[], void>({
            query: () => `/dialogs`,
            providesTags: () => [{ type: 'Dialogs' }],
        }),
        createDialog: builder.mutation<IDialog, ICreateDialog>({
            query: (body) => ({
                url: `/dialogs`,
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Dialogs'],
        }),
    }),
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetDialogsQuery, useCreateDialogMutation } = dialogApi