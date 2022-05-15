const initState = {
    loading: false,
    success: false,
    error: false,
    value: 0,
}
export const UPLOAD_SUCCESS = 'UPLOAD_SUCCESS'
export const UPLOAD_LOADING = 'UPLOAD_LOADING'
export const UPLOAD_FAILED = 'UPLOAD_STATUS';
export const VALUE = 'VALUE'
export const uploadReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === UPLOAD_SUCCESS) {
        return {
            ...state,
            loading: payload.loading,
            error: payload.error,
            success: payload.success,
        }
    }
    if (type === UPLOAD_FAILED) {
        return {
            ...state,
            loading: payload.loading,
            success: payload.success,
            error: payload.error,
        }
    }
    if (type === UPLOAD_LOADING) {
        return {
            ...state,
            loading: payload.loading
        }
    }
    if (type === VALUE) {
        return {
            ...state,
            value: payload.value,
            loading: payload.loading
        }
    }
    return state;
}