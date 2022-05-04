export const ALL_SEARCH_USER_SUCCESS = 'ALL_SEARCH_USER_SUCCESS'
export const ALL_SEARCH_USER_FAILED = 'ALL_SEARCH_USER_FAILED';
export const ALL_SEARCH_LOADING = 'ALL_SEARCH_LOADING';
const initState = {
    searchUser:[],
    error: '',
    count: 0,
    loading: false,
    success: ''
}
export const allUserSearchReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === ALL_SEARCH_USER_SUCCESS) {
        return {
            ...state,
            loading: false,
            searchUser: payload.data?.data,
            count: payload.data?.count,
            error: '',
            success: payload.message
        }
    }
    if (type === ALL_SEARCH_USER_FAILED) {
        return {
            ...state,
            loading: false,
            error: payload.error,
            success: ''
        }
    }
    return state;
}