import { SELECTED_CHAT_FAILED, SELECTED_CHAT_LOADING, SELECTED_CHAT_SUCCESS } from "../type/selectedChatTypes"

export const getSelectedChat = (chatId, token) => {
    // console.log(chatId, token)
    return async (dispatch) => {
        dispatch({
            type: SELECTED_CHAT_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`https://collaballsystem.herokuapp.com/api/chat/${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: SELECTED_CHAT_LOADING,
                        payload: {
                            loading: false,
                        }
                    })
                    if (data) {
                        dispatch({
                            type: SELECTED_CHAT_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                    }
                    if (data?.error) {
                        dispatch({
                            type: SELECTED_CHAT_FAILED,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: SELECTED_CHAT_LOADING,
                payload: {
                    loading: false,
                }
            })
            dispatch({
                type: SELECTED_CHAT_FAILED,
                payload: {
                    error: error.message,
                }
            })
        }
    }
}