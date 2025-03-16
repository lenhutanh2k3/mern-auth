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
    updateUserStart: (state) => {
      state.loading = true;
    },
    updateUserSuccess: (state, action) => {
      state.loading = false;
      state.userCurrent = action.payload; // Lưu ý: action.payload có thể chứa trường 'others' nếu bạn đang loại bỏ password trong response
      state.error = null;
    },
    updateUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});
export const {
  loginStart,
  loginSuccess,
  loginFailed,
  logout,
  updateUserStart,
  updateUserSuccess,
  updateUserFailed,
} = userSlice.actions;
export default userSlice.reducer;