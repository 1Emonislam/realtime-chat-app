import { FAILED_MESSAGE, GET_MESSAGE, LOADING_MESSAGE, NOTE_CREATE, REMOVE_MESSAGE, SEND_MESSAGE, UPDATE_MESSAGE, UPDATE_MESSAGE_FAILED, UPDATE_MESSAGE_STORE } from "../type/messageTypes";
export const getMessage = (chatId, token, search) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`https://collaballapp.herokuapp.com/api/message/${chatId}?search=${search || ''}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        // console.log(data)
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

export const sendMessage = (data, chatId, token, audio, video, others) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            //make sure all data array passing
            fetch(`https://collaballapp.herokuapp.com/api/message`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: {
                        text: data,
                        audio: audio,
                        video: video,
                        others: others
                    },
                    chatId: chatId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    //console.log(data)
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
        }
    }
}
export const editMessage = (data, chatId, messageId, token, messageEditHandle) => {
    // console.log(data, chatId, messageId, token)
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`https://collaballapp.herokuapp.com/api/message`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: {
                        text: data,
                        audio: [],
                        video: [],
                        images: [],
                        others: []
                    },
                    chatId: chatId,
                    messageId: messageId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        dispatch({
                            type: FAILED_MESSAGE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                    if (data) {
                        messageEditHandle(false)
                        if (data?.data) {
                            const findUpdateMsg = data?.data.find(msg => msg?._id?.toString() === messageId?.toString())
                            dispatch({
                                type: UPDATE_MESSAGE,
                                payload: {
                                    message: data?.message,
                                    data: data,
                                    updateMsg: findUpdateMsg,
                                }
                            })
                        }
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
export const deleteMessage = (chatId, messageId, token) => {
    // console.log(data, chatId, messageId, token, editor)
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`https://collaballapp.herokuapp.com/api/message`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    chatId: chatId,
                    messageId: messageId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        dispatch({
                            type: FAILED_MESSAGE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                    if (data) {
                        // console.log(data)
                        dispatch({
                            type: REMOVE_MESSAGE,
                            payload: {
                                message: data?.message,
                                data: data,
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
export const deleteAllMessage = (chatId, token) => {
    //  console.log(chatId, token)
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`https://collaballapp.herokuapp.com/api/message/${chatId}`, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        dispatch({
                            type: FAILED_MESSAGE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                    if (data) {
                        dispatch({
                            type: REMOVE_MESSAGE,
                            payload: {
                                message: data?.message,
                                data: data,
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
export const updateMessageStore = (data) => {
    // console.log(data)
    return async (dispatch) => {
        try {
            dispatch({
                type: UPDATE_MESSAGE_STORE,
                payload: {
                    data: data,
                }
            })
        }
        catch (error) {
            dispatch({
                type: UPDATE_MESSAGE_FAILED,
                payload: {
                    data: null,
                }
            })
        }
    }
}

//Note 
export const noteCreate = (chatId, messageId, token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaballapp.herokuapp.com/api/note`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    chatId: chatId,
                    messageId: messageId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error) {
                        dispatch({
                            type: FAILED_MESSAGE,
                            payload: {
                                error: data?.error,
                            }
                        })
                    }
                    if (data) {
                        dispatch({
                            type: NOTE_CREATE,
                            payload: {
                                message: data?.message,
                                data: data?.data,
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