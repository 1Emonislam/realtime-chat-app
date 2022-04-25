import { SELECTED_CHAT_SUCCESS } from "../type/selectedChatTypes";

const initState = {
    chat: [],
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
    return state;
}