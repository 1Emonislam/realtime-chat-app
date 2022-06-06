import { toast } from "react-toastify";
import { WRITE_MSG } from "../reducers/messageReducer";
import { UPLOAD_FAILED, UPLOAD_SUCCESS } from "../reducers/uploadReducer";
import { GROUP_LOADING_DATA } from "../type/groupType";
import { FAILED_MESSAGE, GET_MESSAGE, LOADING_MESSAGE, NOTE_CREATE, REMOVE_MESSAGE, SEND_MESSAGE, UPDATE_MESSAGE, UPDATE_MESSAGE_FAILED, UPDATE_MESSAGE_STORE } from "../type/messageTypes";
import store from './../store';
export const getMessage = (chatId, token, search) => {
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: true,
            },
        })
        try {
            fetch(`https://chalechat.herokuapp.com/api/message/${chatId}?search=${search || ''}`, {
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

export const sendMessage = (data, chatId, token, audio) => {
    if (!store.getState()?.socketFunc?.socket?.current) {
        toast.error('Message Sending failed! try again', {
            position: "bottom-right",
            theme: store.getState()?.theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return
    };
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: false,
            },
        })
        dispatch({
            type: GROUP_LOADING_DATA,
            payload: {
                loading: false,
            },
        })
        try {
            //make sure all data array passing
            fetch(`https://chalechat.herokuapp.com/api/message`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: {
                        text: data,
                        audio: audio,
                    },
                    chatId: chatId,
                })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: WRITE_MSG,
                        payload: {
                            write: ''
                        }
                    })
                    if (store.getState()?.socketFunc?.socket?.current) {
                        store.getState()?.socketFunc?.socket?.current.emit("new message", data?.data);

                    }
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
export const sendAllUploadMessage = (data, chatId, token) => {
    if (!store.getState()?.socketFunc?.socket?.current) {
        toast.error('Message Sending failed! try again', {
            position: "bottom-right",
            theme: store.getState()?.theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return
    };
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: false,
            },
        })
        dispatch({
            type: GROUP_LOADING_DATA,
            payload: {
                loading: false,
            },
        })
        try {
            //make sure all data array passing
            fetch(`https://chalechat.herokuapp.com/api/message/all/upload/${chatId}`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json",
                    // "Content-Type": "multipart/form-data",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: WRITE_MSG,
                        payload: {
                            write: ''
                        }
                    })
                    if (store.getState()?.socketFunc?.socket?.current) {
                        store.getState()?.socketFunc?.socket?.current.emit("new message", data?.data);
                    }
                    //console.log(data)
                    if (data) {
                        dispatch({
                            type: SEND_MESSAGE,
                            payload: {
                                message: data?.message,
                                data: data,
                            }
                        })
                        dispatch({
                            type: UPLOAD_SUCCESS,
                            payload: {
                                success: true,
                                error: false,
                                loading: false,
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
                        dispatch({
                            type: UPLOAD_FAILED,
                            payload: {
                                success: false,
                                error: true,
                                loading: false,
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
    let text;
    if (data.startsWith('edited')) {
        text = data;
    } else {
        text = `edited ` + data;
    }

    if (!store.getState()?.socketFunc?.socket?.current) {
        toast.error('Message Update failed! try again', {
            position: "bottom-right",
            theme: store.getState()?.theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return
    };
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: false,
            },
        })
        try {
            fetch(`https://chalechat.herokuapp.com/api/message`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    content: {
                        text: text,
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
                        console.log(data.updateMsg)
                        if(data.updateMsg){
                            if (store.getState()?.socketFunc?.socket?.current) {
                                store.getState()?.socketFunc?.socket?.current.emit("new message",data.updateMsg);
                            }
                        }
                        if (data?.data) {
                            dispatch({
                                type: UPDATE_MESSAGE,
                                payload: {
                                    message: data?.message,
                                    data: data,
                                    updateMsg: data?.updateMsg,
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
export const reactionMessage = (reaction, chatId, messageId, token, messageEditHandle) => {
    if (!store.getState()?.socketFunc?.socket?.current) {
        toast.error('Message Reaction failed! try again', {
            position: "bottom-right",
            theme: store.getState()?.theme?.theme,
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        return
    };
    return async (dispatch) => {
        dispatch({
            type: LOADING_MESSAGE,
            payload: {
                loading: false,
            },
        })
        try {
            // https://chalechat.herokuapp.com
            fetch(`https://chalechat.herokuapp.com/api/message/reaction`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({
                    reaction,
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
                        if (messageEditHandle) {
                            messageEditHandle(false)
                        }
                        if (data.updateMsg) {
                            if (store.getState()?.socketFunc?.socket?.current) {
                                store.getState()?.socketFunc?.socket?.current.emit("new message", data?.updateMsg);
                            }
                        }
                        if (data?.data) {
                            dispatch({
                                type: UPDATE_MESSAGE,
                                payload: {
                                    message: data?.message,
                                    data: data,
                                    updateMsg: data.updateMsg,
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
                loading: false,
            },
        })
        try {
            fetch(`https://chalechat.herokuapp.com/api/message`, {
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
                loading: false,
            },
        })
        try {
            fetch(`https://chalechat.herokuapp.com/api/message/${chatId}`, {
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
            fetch(`https://chalechat.herokuapp.com/api/note`, {
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