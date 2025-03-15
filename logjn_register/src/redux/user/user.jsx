import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userCurrent: null,
  error: null,
  loading: false,
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginStart: (state) => {
      state.loading = true;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.userCurrent = action.payload;
      state.error = null;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.userCurrent = null;
      state.error = null;
      state.loading = false;
    },
  },
});
export const {loginStart, loginSuccess, loginFailed, logout} = userSlice.actions;
export default userSlice.reducer;