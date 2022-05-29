export const ONLINE_USER = 'ONLINE_USER'
const onlineUserInit = {
    online: [],
    offline: []
}
export const onlineUserReducer = (state = onlineUserInit, action) => {
    const { type, payload } = action;
    if (type === ONLINE_USER) {
        return {
            ...state,
            online: payload.online,
            offline: payload.offline
        }
    }
    return state;
}   