
const initialState = {
    notes: [],
    loading: false,
    error: '',
    message: '',
}

export const GET_NOTES = 'GET_NOTES';
export const POST_NOTES = 'POST_NOTES';
export const LOADING_NOTES = 'LOADING_NOTES';

export const notesReducer = (state = initialState, action) => {
    const { type, payload } = action;
    if (type === POST_NOTES) {
        return {
            ...state,
            loading: false,
            notes: payload?.data
        }
    }

    return state;
}
