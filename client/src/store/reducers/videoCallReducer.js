const initState = {
    userName: '',
    roomName: '',
    profile: '',
}
export const VIDEO_CALL_MY_INFO = 'VIDEO_CALL_MY_INFO'
export const videoCallReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === VIDEO_CALL_MY_INFO) {
        return {
            ...state,
            userName: payload.userName,
            roomName: payload.roomName,
            profile: payload.profile
        }
    }
    return state;
}