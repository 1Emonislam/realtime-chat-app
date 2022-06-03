import axios from 'axios'
import { ERROR_NOTE, GET_NOTES, LOADING_NOTES, POST_NOTES } from "../reducers/notesReducer"
export const createNotes = (messageId, chatId, title, details, token, handleNoteClose) => {
    return async (dispatch) => {
        fetch(`http://localhost:5000/api/note/`, {
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
                // console.log(data)
                if (data.data) {
                    handleNoteClose()
                    // console.log(data)
                    dispatch({
                        type: POST_NOTES,
                        payload: {
                            message: data?.message,
                            note: data?.data?.note,
                            noteCount: data?.data.noteCount,
                            trash: [],
                            archive: [],
                            pin: [],
                            unPin: []
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
            axios.post('http://localhost:5000/api/note/', data, config).then(({ data }) => {
                // console.log(data)
                reset()
                dispatch({
                    type: POST_NOTES,
                    payload: {
                        loading: false,
                        note: data?.data?.note,
                        message: data.message,
                        noteCount: data?.data?.noteCount,
                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        error: data.error,
                    }
                })
            })

        }
        catch (error) {

        }
    }
}

export const actionByNotesUpdate = (data, noteId, token, notePage, handleClose) => {
    return (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        fetch(`http://localhost:5000/api/note/${noteId}?page=${notePage}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((data) => {
                if (handleClose) {
                    handleClose()
                }
                // console.log(data)
                dispatch({
                    type: GET_NOTES,
                    payload: {
                        message: data.message,
                        loading: false,
                        note: data?.data?.note,
                        trash: data?.data?.trash,
                        archive: data?.data?.archive,
                        pin: data?.data?.pin,
                        unPin: data.data.unPin,
                        unPinCount: data.data.unPinCount,
                        noteCount: data?.data?.noteCount,
                        trashCount: data?.data?.trashCount,
                        archiveCount: data?.data?.archiveCount,
                        pinCount: data?.data?.pinCount,

                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        error: data.error,
                    }
                })
            })
    }
}
export const actionByNotesTrashUpdate = (data, noteId, token, setTrashCount, trashPage) => {
    return (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        fetch(`http://localhost:5000/api/note/${noteId}?page=${trashPage}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTrashCount(data?.data.trashCount)
                dispatch({
                    type: GET_NOTES,
                    payload: {
                        message: data.message,
                        loading: false,
                        note: data?.data?.note,
                        trash: data?.data?.trash,
                        archive: data?.data?.archive,
                        unPin: data.data.unPin,
                        unPinCount: data.data.unPinCount,
                        pin: data?.data?.pin,
                        noteCount: data?.data?.noteCount,
                        trashCount: data?.data?.trashCount,
                        archiveCount: data?.data?.archiveCount,
                        pinCount: data?.data?.pinCount,

                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        error: data.error,
                    }
                })
            })
    }
}
export const actionByNotesTrashSingleDelete = (noteId, token, setTrashCount, trashPage) => {
    return (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        fetch(`http://localhost:5000/api/note/trash/${noteId}?page=${trashPage}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTrashCount(data?.data.trashCount)
                dispatch({
                    type: GET_NOTES,
                    payload: {
                        message: data.message,
                        loading: false,
                        note: data?.data?.note,
                        trash: data?.data?.trash,
                        archive: data?.data?.archive,
                        unPin: data.data.unPin,
                        unPinCount: data.data.unPinCount,
                        pin: data?.data?.pin,
                        noteCount: data?.data?.noteCount,
                        trashCount: data?.data?.trashCount,
                        archiveCount: data?.data?.archiveCount,
                        pinCount: data?.data?.pinCount,

                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        error: data.error,
                    }
                })
            })
    }
}
export const actionByNotesTrashAllDelete = (token, setTrashCount, trashPage) => {
    return (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        fetch(`http://localhost:5000/api/note?page=${trashPage}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then((data) => {
                // console.log(data)
                setTrashCount(data?.data?.trashCount)
                dispatch({
                    type: GET_NOTES,
                    payload: {
                        message: data.message,
                        loading: false,
                        note: data?.data?.note,
                        trash: data?.data?.trash,
                        unPin: data.data.unPin,
                        unPinCount: data.data.unPinCount,
                        archive: data?.data?.archive,
                        pin: data?.data?.pin,
                        noteCount: data?.data?.noteCount,
                        trashCount: data?.data?.trashCount,
                        archiveCount: data?.data?.archiveCount,
                        pinCount: data?.data?.pinCount,

                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        error: data.error,
                    }
                })
            })
    }
}
export const getActinByNotes = (page, limit, token, search, messageId, chatId) => {
    return (dispatch) => {
        dispatch({
            type: LOADING_NOTES,
            payload: {
                loading: true
            }
        })
        const data = {
            messageId: messageId || '',
            chatId: chatId || ''
        }
        fetch(`http://localhost:5000/api/note/actions?search=${search || ''}&page=${page}&limit=${limit}`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then((data) => {
                // setCount(data.count)
                dispatch({
                    type: GET_NOTES,
                    payload: {
                        message: data.message,
                        loading: false,
                        note: data?.data?.note,
                        trash: data?.data?.trash,
                        unPin: data.data.unPin,
                        unPinCount: data.data.unPinCount,
                        archive: data?.data?.archive,
                        pin: data?.data?.pin,
                        noteCount: data?.data?.noteCount,
                        trashCount: data?.data?.trashCount,
                        archiveCount: data?.data?.archiveCount,
                        pinCount: data?.data?.pinCount,

                    }
                })
                dispatch({
                    type: ERROR_NOTE,
                    payload: {
                        loading: false,
                        error: data.error,
                    }
                })
            })
    }
}
