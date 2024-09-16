import { combineReducers, configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';
import { FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import { persistStore } from 'redux-persist';

import transactionSlice from './slices/transactionSlice';

const authPersistConfig = {
    key: "budget_lab",
    storage,
    blacklist: ["somethingTemporary"],
};
const reducers = persistReducer(authPersistConfig, combineReducers({
    transactions: transactionSlice,
}));
export const makeStore = configureStore({
    reducer: {
        reducers,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export const persistor = persistStore(makeStore);


export type AppStore = typeof makeStore
export type RootState = ReturnType<AppStore['getState']>