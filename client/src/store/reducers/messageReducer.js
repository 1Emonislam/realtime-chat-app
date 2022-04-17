import { GET_MESSAGE, SEND_MESSAGE, LOADING_MESSAGE, FAILED_MESSAGE, MESSAGE_WRITE } from "../type/messageTypes";

const initState = {
    msg: '',
    write: '',
    loading: false,
    error: '',
    success: '',
}
export const messageReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === LOADING_MESSAGE) {
        return {
            ...state,
            loading: payload.loading
        }
    }
    if (type === GET_MESSAGE) {
        return {
            ...state,
            msg: payload.data,
            loading: false
        }
    }
    if (type === SEND_MESSAGE) {
        return {
            ...state,
            msg: payload.data,
            loading: false
        }
    }

    if (type === FAILED_MESSAGE) {
        return {
            ...state,
            error: payload.error,
            loading: false
        }
    }
    if (type === MESSAGE_WRITE) {
        return {
            ...state,
            write: payload.data
        }
    }
    return state;
}