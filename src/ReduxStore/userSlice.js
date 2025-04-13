import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: null,
    name: null,
    userId:null,
    role:null,
  },
  reducers: {
    setUser(state, action) {
      state.token = action.payload.usertoken;
      state.name = action.payload.UserName;
      state.userId = action.payload.user_ID;
      state.role = action.payload.UserRole;
    },
    clearUser(state) {
      state.token = null;
      state.name = null;
      state.userId=null;
      state.role= null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
