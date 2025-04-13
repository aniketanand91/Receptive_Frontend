import { combineReducers } from "@reduxjs/toolkit";
import auth from "./auth/authslice";
import globalData from "./globaldata/globalslice";


const rootReducer = combineReducers({
    auth,
    globalData,
});

export default rootReducer;