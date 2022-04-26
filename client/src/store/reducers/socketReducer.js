import { SOCKET_GLOBAL } from "../type/socketType";

const init = {
    socket: null
}
export const socketReducer = (state = init, action) => {
    const { payload, type } = action;
    if (type === SOCKET_GLOBAL) {
        return {
            ...state,
            socket: payload.socket,
        }
    }
    return state;
}