
const initialState = {
    notes: [],
    count: 0,
    loading: false,
    error: '',
    message: '',
}

export const GET_NOTES = 'GET_NOTES';
export const POST_NOTES = 'POST_NOTES';
export const LOADING_NOTES = 'LOADING_NOTES';
export const ERROR_NOTE = 'ERROR_NOTE'
export const MESSAGE_NOTE = 'MESSAGE_NOTE'
export const notesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    if (type === LOADING_NOTES) {
        return {
            ...state,
            loading: payload.loading
        }
    }
    if (type === POST_NOTES) {
        return {
            ...state,
            loading: false,
            notes: payload?.data,
            count: payload.count,
            message: payload.message
        }
    }
    if (type === GET_NOTES) {
        return {
            ...state,
            notes: payload.notes,
            loading: false,
            count: payload.count,
            error: payload.error,
            message: payload.message,
        }
    }
    if (type === MESSAGE_NOTE) {
        return {
            ...state,
            loading: false,
            message: payload.message
        }
    }
    if (type === ERROR_NOTE) {
        return {
            ...state,
            loading: false,
            error: payload.error
        }
    }

    return state;
}
