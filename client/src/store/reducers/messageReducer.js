import { GET_MESSAGE, LOADING_MESSAGE } from "../type/messageTypes";

const initState = {
    message: [],
    loading: false,
    error:'',
    success:'',
}
export const messageReducer = async (state = initState, action) => {
    const { payload, type } = action;
    // console.log(payload)
    if (type === GET_MESSAGE) {
        return {
            ...state,
            message: payload.data,
            loading: false
        }
    }
    if (type === LOADING_MESSAGE) {
        return {
            ...state,
            loading: payload.loading
        }
    }
}