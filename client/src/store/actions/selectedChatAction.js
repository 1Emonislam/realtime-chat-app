import { ADMIN_MEMBER_STORE, MEMBER_ADD_STORE } from "../reducers/paginationMembersReducer"
import { SELECTED_CHAT_FAILED, SELECTED_CHAT_LOADING, SELECTED_CHAT_SUCCESS } from "../type/selectedChatTypes"

export const getSelectedChat = (chatId, token, pageUser, limitUser, setCountMember, setCountAdmin, countMember, countAdmin, setPageUser) => {
    // console.log(chatId, token)
    return async (dispatch) => {
        dispatch({
            type: SELECTED_CHAT_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`http://localhost:5000/api/chat/${chatId}?page=${pageUser || 1}&limit=${limitUser || 10}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data?.members?.length) {
                        dispatch({
                            type: MEMBER_ADD_STORE,
                            payload: {
                                members: data?.data?.members,
                                countMember: data?.memberCount,
                            }
                        })
                        setCountMember(data.memberCount)
                    }
                    if (data?.data?.groupAdmin?.length) {
                        dispatch({
                            type: ADMIN_MEMBER_STORE,
                            payload: {
                                groupAdmin: data?.data?.groupAdmin,
                                countAdmin: data?.adminCount,
                            }
                        })
                        setCountAdmin(data.adminCount)
                    }
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
export const getMembersPagination = (chatId, token, pageUser, limitUser, setCountMember, setCountAdmin, countMember, countAdmin, setPageUser) => {
    // console.log(chatId, token)
    return async (dispatch) => {
        try {
            fetch(`http://localhost:5000/api/chat/${chatId}?page=${pageUser || 1}&limit=${limitUser || 10}`, {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data?.members?.length) {
                        dispatch({
                            type: MEMBER_ADD_STORE,
                            payload: {
                                members: data?.data?.members,
                                countMember: data?.memberCount,
                            }
                        })
                        setCountMember(data.memberCount)
                    }
                    if (data?.data?.groupAdmin?.length) {
                        dispatch({
                            type: ADMIN_MEMBER_STORE,
                            payload: {
                                groupAdmin: data?.data?.groupAdmin,
                                countAdmin: data?.adminCount,
                            }
                        })
                        setCountAdmin(data.adminCount)
                    }
                })
        }
        catch (error) {
        }
    }
}