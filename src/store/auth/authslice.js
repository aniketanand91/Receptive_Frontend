import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    loginResp: undefined,
    loggedInUserResp: undefined,
    authErrorResp: undefined,
}

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoginAct: (state, action) => {
            state.loginResp = action.payload;
        },
        setLoggedInUserAct: (state, action) => {
            state.loggedInUserResp = action.payload;
        },
        setAuthErrorAct: (state, action) => {
            state.authErrorResp = action.payload;
        },
        setLogoutUserAct: (state) => {
            state.loginResp = undefined;
            state.loggedInUserResp = undefined;
        },
        setClearAuthAct: (state, action) => {
            state.loginResp = undefined;
            state.loggedInUserResp = undefined;
        },
    }
})

export default authSlice.reducer;
export const { setLoginAct, setLoggedInUserAct, setLogoutUserAct, setClearAuthAct, setAuthErrorAct } = authSlice.actions;