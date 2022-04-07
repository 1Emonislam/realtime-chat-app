import { AUTH_ERROR, AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS, AUTH_MESSAGE } from "../type/authType";
const authState = {
    loading: false,
    authenticate: false,
    error: '',
    message: '',
    user: window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user")),
}
export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    if (type === AUTH_FAILED) {
        // console.log(payload.error)
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            user: null,
            loading: false
        }
    }
    if (type === AUTH_SUCCESS) {
        return {
            ...state,
            message: payload.message,
            user: payload.data,
            authenticate: true,
            error: '',
            loading: false
        }
    }
    if (type === AUTH_LOADING) {
        return {
            ...state,
            loading: true,
            error: '',
            message: ''
        }
    }
    if (type === AUTH_ERROR) {
        return {
            ...state,
            loading: false,
            error: '',
        }
    }
    if (type === AUTH_MESSAGE) {
        return {
            ...state,
            loading: false,
            message: '',
        }
    }
    return state;
}