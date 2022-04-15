import { GROUP_FAILED_DATA, GROUP_GET_DATA, GROUP_LOADING_DATA, GROUP_SUCCESS_DATA } from "../type/groupType";

const initState = {
    message: '',
    error: '',
    loading: false,
    data: null
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
    if (type === GROUP_LOADING_DATA) {
        return {
            ...state,
            loading: payload.loading,
        }
    }
    return state;
}