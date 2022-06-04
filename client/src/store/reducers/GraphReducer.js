const initState = {
    toWeek: new Date(),
    msgCount: 0,
}
export const WEEK_MSG_COUNT = 'WEEK_MSG_COUNT'
export const graphReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === WEEK_MSG_COUNT) {
        return {
            ...state,
            msgCount: payload.msgCount,
            toWeek: payload.toWeek,
        }
    }
    return state
}