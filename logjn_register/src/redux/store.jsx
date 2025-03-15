import { configureStore } from "@reduxjs/toolkit";
import userSlice from './user/user.jsx'
export const store = configureStore({
  reducer: {
    user: userSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
  devTools: true,

});