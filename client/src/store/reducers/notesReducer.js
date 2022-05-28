
const initialState = {
    notes: [],
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
    if (type === POST_NOTES) {
        return {
            ...state,
            loading: false,
            notes: payload?.data,
            message: payload.message
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
