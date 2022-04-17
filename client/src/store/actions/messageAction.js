import { FAILED_MESSAGE, GET_MESSAGE, LOADING_MESSAGE, SEND_MESSAGE } from "../type/messageTypes"
export const getMessage = (chatId, token) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`http://localhost:5000/api/message/${chatId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        dispatch({
                            type: GET_MESSAGE,
                            payload: {
                                message: data?.message,
                                data: data,
                            }
                        })
                    }
                    if (data.error) {
                        dispatch({
                            type: FAILED_MESSAGE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: FAILED_MESSAGE,
                payload: {
                    error: error.message,
                }
            })
        }
    }
}
export const sendMessage = (data, chatId, token) => {
    // console.log(token)
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`http://localhost:5000/api/message`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: {
                        text: data,
                        audio: [],
                        video: [],
                        others: []
                    },
                    chatId: chatId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        dispatch({
                            type: SEND_MESSAGE,
                            payload: {
                                message: data?.message,
                                data: data,
                            }
                        })
                    }
                    if (data.error) {
                        dispatch({
                            type: FAILED_MESSAGE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: FAILED_MESSAGE,
                payload: {
                    error: error.message,
                }
            })
        }
    }
}