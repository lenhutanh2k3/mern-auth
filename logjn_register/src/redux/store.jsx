import { configureStore ,combineReducers } from "@reduxjs/toolkit";
import userSlice from './user/user.jsx'
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
const  rootReducer = combineReducers({
  user: userSlice,
})
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
  version :1,
};
const persistedReducer =persistReducer(persistConfig, rootReducer);
export const store = configureStore({
  reducer:persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,
});
export const persistor = persistStore(store);