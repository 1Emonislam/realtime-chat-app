import { REGISTER_FAIL, REGISTER_SUCCESS } from "../type/authType";
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
        return {
            ...state,
            error: payload.error,
            authenticate: false,
            user: null,
            loading: true
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
    return state;
}