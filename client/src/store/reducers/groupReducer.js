import { GROUP_FAILED_DATA, GROUP_GET_DATA, GROUP_LOADING_DATA, GROUP_SUCCESS_DATA, RECENT_MESSAGE_DATA } from "../type/groupType";

const initState = {
    message: '',
    error: '',
    loading: false,
    data: [],
    latestMessage: []
}
export const groupReducer = (state = initState, action) => {
    const { payload, type } = action;
    // console.log(payload)
    if (type === GROUP_SUCCESS_DATA) {
        return {
            ...state,
            loading: false,
            message: payload.message,
            error: '',
            data: payload.data,
        }
    }
    if (type === GROUP_GET_DATA) {
        // console.log(payload?.data)
        return {
            ...state,
            loading: false,
            message: '',
            error: '',
            data: payload.data,
        }
    }
    if (type === GROUP_FAILED_DATA) {
        return {
            ...state,
            message: '',
            loading: false,
            error: payload.error,
            data: null,
        }
    }
    if (type === RECENT_MESSAGE_DATA) {
        return {
            ...state,
            seen: payload?.seen,
            latestMessage: payload?.latestMessage,
        }
    }
    if (type === GROUP_LOADING_DATA) {
        return {
            ...state,
            loading: payload.loading,
        }
    }
    return state;
}