import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./data/slice.ts";
import {
    persistReducer,
    persistStore,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer<ReturnType<typeof storeReducer>>(
    persistConfig, storeReducer);

export const store = configureStore({
    reducer: {
        store: persistedReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        })
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;