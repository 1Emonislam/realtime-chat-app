import { NOTIFICATION_GET, NOTIFICATION_GET_SEEN, NOTIFICATION_GET_UNSEEN, NOTIFICATION_PUSH } from "../type/messageNotificationTypes";

const init = {
    msgNotification: [],
    myunread: 0,
}
export const messageNotificationPush = (state = init, action) => {
    const { payload, type } = action;
    if (type === NOTIFICATION_PUSH) {
        return {
            ...state,
            msgNotification: payload.data,
            myunread: payload.myunread,
        }
    }
    if (type === NOTIFICATION_GET) {
        return {
            ...state,
            msgNotification: payload?.data?.data,
            myunread: payload?.data?.myunread,
        }
    }
    if (type === NOTIFICATION_GET_UNSEEN) {
        return {
            ...state,
            msgNotification: payload.data,
            myunread: payload.data?.myunread,
        }
    }
    if (type === NOTIFICATION_GET_SEEN) {
        return {
            ...state,
            msgNotification: payload?.data?.data,
            myunread: payload?.data?.myunread,
        }
    }
    return state;
}