import { FAILED_MESSAGE, GET_MESSAGE, LOADING_MESSAGE, MESSAGE_WRITE, NOTE_CREATE, REMOVE_MESSAGE, SEND_MESSAGE, SUCCESS_MESSAGE_CLEAR, UPDATE_MESSAGE, UPDATE_MESSAGE_FAILED, UPDATE_MESSAGE_STORE } from "../type/messageTypes";

const initState = {
    msg: [],
    write: '',
    loading: false,
    error: '',
    success: '',
    messageInfoStore: [],
    note: [],
}
export const messageReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === LOADING_MESSAGE) {
        return {
            ...state,
            loading: payload.loading
        }
    }
    if (type === UPDATE_MESSAGE) {
        return {
            ...state,
            sent: true,
            msg: payload.data,
            loading: false
        }
    }
    if (type === UPDATE_MESSAGE_STORE) {
        return {
            ...state,
            messageInfoStore: payload.data,
            error: '',
            loading: false
        }
    }
    if (type === UPDATE_MESSAGE_FAILED) {
        return {
            ...state,
            success: '',
            error: payload.error,
            msg: null,
            loading: false
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
    if (type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            success: '',
            loading: false
        }
    }
    if (type === REMOVE_MESSAGE) {
        return {
            ...state,
            msg: payload.data,
            error: payload.error,
            success: payload.message,
            loading: false
        }
    }
    if (type === MESSAGE_WRITE) {
        return {
            ...state,
            write: payload.data,
            loading: false
        }
    }

    //note
    if (type === NOTE_CREATE) {
        return {
            ...state,
            success: payload.message,
            note: payload.data,
            loading: false
        }
    }
    return state;
}