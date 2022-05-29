import { SELECTED_CHAT_FAILED, SELECTED_CHAT_LOADING, SELECTED_CHAT_SUCCESS } from "../type/selectedChatTypes"

export const getSelectedChat = (chatId, token, pageUser, limitUser, setCountMember,setCountAdmin, countMember,countAdmin, setPageUser) => {
    // console.log(chatId, token)
    return async (dispatch) => {
        dispatch({
            type: SELECTED_CHAT_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`https://collaballapp.herokuapp.com/api/chat/${chatId}?page=${pageUser || 1}&limit=${limitUser || 10}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    setCountMember(data.memberCount)
                    setCountAdmin(data.setAdminCount)
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
                                data: data,
                                message: data.message
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