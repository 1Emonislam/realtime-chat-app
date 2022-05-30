import axios from 'axios'
import { ERROR_NOTE, GET_NOTES, LOADING_NOTES, POST_NOTES } from "../reducers/notesReducer"
export const createNotes = (messageId, chatId, title, details, token, handleNoteClose) => {
    return async (dispatch) => {
        fetch(`https://collaballapp.herokuapp.com/api/note/`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify({
                messageId, chatId, title, details
            })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.data) {
                    handleNoteClose()
                    // console.log(data)
                    dispatch({
                        type: POST_NOTES,
                        payload: {
                            message: data?.message,
                            data: data.data,
                        }
                    })
                }
                if (data.error) {
                    dispatch({
                        type: ERROR_NOTE,
                        payload: {
                            error: data?.error,
                        }
                    })
                }
            })
    }
}

export const createNoteItem = (data, token, reset) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        }
        try {
            axios.post('https://collaballapp.herokuapp.com/api/note/', data, config).then(({ data }) => {
                // console.log(data)
                reset()
                dispatch({
                    type: POST_NOTES,
                    payload: {
                        loading: false,
                        notes: data?.data,
                        message: data.message,
                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        message: data.error,
                    }
                })
            })

        }
        catch (error) {

        }
    }
}
export const actionByNotesGet = (action, page, limit, setCount, token, search, messageId, chatId) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        const config = {
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        }
        const data = {
            action, messageId, chatId
        }
        try {
            axios.post(`https://collaballapp.herokuapp.com/api/note/actions?search=${search || ''}&page=${page}limit=${limit}`, data, config).then(({ data }) => {
                // console.log(data)
                setCount(data.count)
                dispatch({
                    type: GET_NOTES,
                    payload: {
                        loading: false,
                        notes: data?.data,
                        count: data.count,
                        message: data.message,
                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        message: data.error,
                    }
                })
            })
        }
        catch (error) {

        }
    }
}