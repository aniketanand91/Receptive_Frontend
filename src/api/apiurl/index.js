const authBaseurl = 'users';
const auth = 'api';

export const authApiUrl = {
    login: `${authBaseurl}/login`,
    oAuth: `${authBaseurl}/google-oauth`,
    signUp: `${authBaseurl}/signup`
}

export const courseApiUrl = {
    getCourse: `${auth}/courses`
}