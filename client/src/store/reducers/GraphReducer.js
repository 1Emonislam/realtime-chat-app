const initState = {
    todayDate: new Date(),
    weekDate: new Date(),
    today: {
        msgCount: 0,
        joinGroupCount: 0,
        visitorCount: 0,
        createGroupCount: 0,
    },
    week: {
        msgCount: 0,
        joinGroupCount: 0,
        visitorCount: 0,
        createGroupCount: 0,
    },
    loading: false
}
export const DASHBOARD_GRAPH = 'DASHBOARD_GRAPH'
export const DASHBOARD_GRAPH_LOADING = 'DASHBOARD_GRAPH_LOADING'
export const graphReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === DASHBOARD_GRAPH) {
        return {
            ...state,
            todayDate: payload.todayDate,
            weekDate: payload.weekDate,
            today: payload.today,
            week: payload.week,
            loading: false
        }
    }
    if (type === DASHBOARD_GRAPH_LOADING) {
        return {
            ...state,
            loading: payload.loading
        }
    }
    return state
}
