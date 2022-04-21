import { SINGLE_CHAT_MEMBER_SUCCESS } from "../type/singleChatMemberTypes";

const initState = {
    members: [],
    amIJoined: false,
    groupAdmin: [],
    totalMember: 0,
    chat: '',
    seen: [],
    loading: false,
}
export const singleChatMemberReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === SINGLE_CHAT_MEMBER_SUCCESS) {
        return {
            ...state,
            members: payload?.data?.members,
            amIJoined: payload?.data?.amIJoined,
            groupAdmin: payload?.data?.groupAdmin,
            totalMember: payload?.data?.totalMember,
            chat: payload?.data?.chat,
            seen: payload?.data?.seen,
            loading: false
        }
    }
    return state;
}