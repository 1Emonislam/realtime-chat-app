import { GROUP_FAILED_DATA, GROUP_GET_DATA, GROUP_INVITE_GEN_FAILED, GROUP_INVITE_GEN_SUCCESS, GROUP_LOADING_DATA, GROUP_SUCCESS_DATA, RECENT_MESSAGE_DATA, GROUP_INVITE_SAVE, GROUP_INVITE_ACCEPTED, GROUP_INVITE_DECLINED } from "../type/groupType";

const initState = {
    message: '',
    error: '',
    loading: false,
    data: [],
    groupInvite: '',
    latestMessage: [],
    invited: ''
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
    if (type === GROUP_INVITE_GEN_SUCCESS) {
        return {
            ...state,
            groupInvite: payload.data,
            error: '',
            message: payload.message,
            loading: payload.loading,
        }
    }
    if (type === GROUP_INVITE_GEN_FAILED) {
        return {
            ...state,
            message: '',
            error: payload.error,
            loading: payload.loading,
        }
    }
    if (type === GROUP_INVITE_SAVE) {
        return {
            ...state,
            invited: payload.invite,
        }
    }
    if (type === GROUP_INVITE_ACCEPTED) {
        return {
            ...state,
            message: payload.message,
        }
    }
    if (type === GROUP_INVITE_DECLINED) {
        return {
            ...state,
            error: payload.error,
        }
    }
    return state;
}