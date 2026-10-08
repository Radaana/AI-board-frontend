import { configureStore } from '@reduxjs/toolkit';
// Or from '@reduxjs/toolkit/query/react'
import { setupListeners } from '@reduxjs/toolkit/query';
import { dialogApi } from '../data/dialog.ts';
import dialogUi from './dialogUiSlice.ts';

export const store = configureStore({
    reducer: {
        // Add the generated reducer as a specific top-level slice
        [dialogApi.reducerPath]: dialogApi.reducer,
        dialogUi,
    },
    // Adding the api middleware enables caching, invalidation, polling,
    // and other useful features of `rtk-query`.
    middleware: getDefaultMiddleware => getDefaultMiddleware().concat(dialogApi.middleware),
});

// required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
