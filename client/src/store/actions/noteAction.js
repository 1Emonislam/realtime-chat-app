import { ERROR_NOTE, POST_NOTES } from "../reducers/notesReducer"

export const createNotes = (messageId, chatId, title, details, token, handleNoteClose) => {
    return  (dispatch) => {
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