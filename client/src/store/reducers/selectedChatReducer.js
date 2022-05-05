import { MESSAGE_SEARCH_SELECTED, SELECTED_CHAT_FAILED, SELECTED_CHAT_LOADING, SELECTED_CHAT_SUCCESS } from "../type/selectedChatTypes";

const initState = {
    chat: [],
    error: '',
    search: '',
    amIJoined: false,
    amIAdmin: false,
    loading: false,
}
export const selectedChatReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === SELECTED_CHAT_SUCCESS) {
        return {
            ...state,
            chat: payload?.data?.data,
            amIJoined: payload?.data?.amIJoined,
            amIAdmin: payload?.data?.amIAdmin,
            loading: false
        }
    }
    if (type === SELECTED_CHAT_FAILED) {
        return {
            ...state,
            error: payload.error,
            loading: false
        }
    }
    if (type === SELECTED_CHAT_LOADING) {
        return {
            ...state,
            loading: payload.loading
        }
    }
    if (type === MESSAGE_SEARCH_SELECTED) {
        return {
            ...state,
            search: payload.search,
        }
    }
    return state;
}