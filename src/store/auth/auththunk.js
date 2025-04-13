import { getData, postData } from "../../api/apiactions";

import {
    setLoginAct, setLoggedInUserAct, setAuthErrorAct
} from "./authslice";

export function loginUserAct(apiUrl, payload) {
    return async (dispatch) => {
        const response = await postData(apiUrl, payload);
        if (response.status === 200) {
            dispatch(setLoginAct(response.data));
        } else {
            dispatch(setAuthErrorAct(response));
        }
    }
}

export function getLoggedInuserAct(apiUrl) {
    return async (dispatch) => {
        const response = await getData(apiUrl);
        if (response.status === 200) {
            dispatch(setLoggedInUserAct(response.data));
        } else {
            dispatch(setAuthErrorAct(response));
        }
    }
}



