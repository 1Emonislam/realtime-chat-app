import { SINGLE_CHAT_MEMBER_FAILED, SINGLE_CHAT_MEMBER_LOADING, SINGLE_CHAT_MEMBER_SUCCESS } from "../type/singleChatMemberTypes"

export const getGroupMember = (chatId, token) => {
    // console.log(chatId, token)
    return async (dispatch) => {
        dispatch({
            type: SINGLE_CHAT_MEMBER_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`http://localhost:5000/api/chat/${chatId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        dispatch({
                            type: SINGLE_CHAT_MEMBER_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                    }
                    if (data?.error) {
                        dispatch({
                            type: SINGLE_CHAT_MEMBER_FAILED,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: SINGLE_CHAT_MEMBER_FAILED,
                payload: {
                    error: error.message,
                }
            })
        }
    }
}