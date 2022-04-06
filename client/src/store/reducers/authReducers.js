import { REGISTER_ERROR, REGISTER_FAIL, REGISTER_LOADING, REGISTER_MESSAGE, REGISTER_SUCCESS } from "../type/authType";
const authState = {
    loading: false,
    authenticate: false,
    error: '',
    message: '',
    user: window.localStorage.getItem("user") && JSON.parse(window.localStorage.getItem("user")),
}
export const authReducer = (state = authState, action) => {
    const { payload, type } = action;
    if (type === REGISTER_FAIL) {
        // console.log(payload.error)
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            user: null,
            loading: false
        }
    }
    if (type === REGISTER_SUCCESS) {
        return {
            ...state,
            message: payload.message,
            user: payload.data,
            authenticate: true,
            error: '',
            loading: false
        }
    }
    if (type === REGISTER_LOADING) {
        return {
            ...state,
            loading: true
        }
    }
    if (type === REGISTER_ERROR) {
        return {
            ...state,
            loading: false,
            error: '',
        }
    }
    if (type === REGISTER_MESSAGE) {
        return {
            ...state,
            loading: false,
            message: '',
        }
    }
    return state;
}