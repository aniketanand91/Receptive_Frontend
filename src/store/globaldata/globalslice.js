import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    apiCallLoading: undefined,
    mobileSideMenuClassName: undefined,
    showBuyCoinModal: false,
    disconnectWallet: undefined,
}

export const globalDataSlicer = createSlice({
    name: "globalData",
    initialState,
    reducers: {
        setApiCallLoadingAct: (state, action) => {
            state.apiCallLoading = action.payload;
        }
    }
})

export default globalDataSlicer.reducer;
export const { setApiCallLoadingAct } = globalDataSlicer.actions;