import { GROUP_FAILED_DATA, GROUP_GET_DATA, GROUP_INVITE_GEN_FAILED, GROUP_INVITE_GEN_SUCCESS, GROUP_LOADING_DATA, GROUP_PROGRESS_ACCEPTED, GROUP_PROGRESS_DECLINED, GROUP_SUCCESS_DATA } from "../type/groupType"
import { GROUP_ADD_MEMBER_FAILED, GROUP_ADD_MEMBER_SUCCESS, SELECTED_CHAT_LOADING } from "../type/selectedChatTypes"
export const getGroupChatData = (token,status,page,limit) => {
    return (dispatch) => {
        dispatch({
            type: GROUP_LOADING_DATA,
            payload: {
                loading: true,
            }
        })
        fetch(`https://collaball.netlify.app/api/chat?status=${status || ''}&page=${page || 1}&limit=${limit || 10}`, {
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
                        type: GROUP_GET_DATA,
                        payload: {
                            message: '',
                            data: data.data,
                        }
                    })
                }
            })
    }
}
export const postGroupChatData = (data, token, reset) => {
    // console.log(data,token)
    return async (dispatch) => {
        dispatch({
            type: GROUP_LOADING_DATA,
            payload: {
                loading: true,
            }
        })
        try {
            fetch('https://collaball.netlify.app/api/chat/group/create', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    if (data?.data) {
                        reset();
                        dispatch({
                            type: GROUP_SUCCESS_DATA,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                        window.location?.reload()
                    }
                    if (data?.error) {
                        dispatch({
                            type: GROUP_FAILED_DATA,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }
}

export const groupInvite = (chatId, token, handleCopy, email) => {
    return async (dispatch) => {
        dispatch({
            type: GROUP_LOADING_DATA,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`https://collaball.netlify.app/api/chat/group/invite/gen`, {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, email })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: GROUP_LOADING_DATA,
                        payload: {
                            loading: false,
                        }
                    })
                    handleCopy(data, 'copy')
                    if (data?.data) {
                        dispatch({
                            type: GROUP_INVITE_GEN_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data,
                                loading: false
                            }
                        })
                    }
                    if (data?.error) {
                        dispatch({
                            type: GROUP_INVITE_GEN_FAILED,
                            payload: {
                                error: data.error,
                                loading: false
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }
}

export const inviteLinkVerify = (chatId, userId, invitedPerson, token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaball.netlify.app/api/chat/group/invite/verify/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, userId, invitedPerson })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: GROUP_LOADING_DATA,
                        payload: {
                            loading: false,
                        }
                    })
                    if (data.error) {
                        dispatch({
                            type: GROUP_LOADING_DATA,
                            payload: {
                                loading: false,
                            }
                        })
                        dispatch({
                            type: GROUP_PROGRESS_DECLINED,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
        catch (error) {

        }
    }
}
export const inviteLinkDeclined = (chatId, userId, invitedPerson, declined, token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaball.netlify.app/api/chat/group/invite/verify/${token}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, userId, invitedPerson, declined })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: GROUP_LOADING_DATA,
                        payload: {
                            loading: false,
                        }
                    })
                    if (data.data) {
                        window.location?.reload()
                    }
                })
        }
        catch (error) {

        }
    }
}


export const groupMemberAdd = (chatId, userCollection, token, handleCopy) => {
    return async (dispatch) => {
        dispatch({
            type: SELECTED_CHAT_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`https://collaball.netlify.app/api/chat/group/addTo`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, userId: userCollection })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: SELECTED_CHAT_LOADING,
                        payload: {
                            loading: false,
                        }
                    })
                    dispatch({
                        type: GROUP_LOADING_DATA,
                        payload: {
                            loading: false,
                        }
                    })
                    handleCopy(data)
                    if (data.error) {
                        dispatch({
                            type: GROUP_ADD_MEMBER_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                    if (data.data) {
                        dispatch({
                            type: GROUP_ADD_MEMBER_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                        window.location?.reload()
                    }
                })
        }
        catch (error) {

        }
    }
}
export const groupMemberRemove = (chatId, userId, token) => {
    return async (dispatch) => {
        dispatch({
            type: SELECTED_CHAT_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch(`https://collaball.netlify.app/api/chat/group/member/removeTo/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, userId })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: SELECTED_CHAT_LOADING,
                        payload: {
                            loading: false,
                        }
                    })
                    dispatch({
                        type: GROUP_PROGRESS_ACCEPTED,
                        payload: {
                            message: data.message
                        }
                    })
                    dispatch({
                        type: GROUP_LOADING_DATA,
                        payload: {
                            loading: false,
                        }
                    })
                    if (data.error) {
                        dispatch({
                            type: GROUP_PROGRESS_DECLINED,
                            payload: {
                                error: data.error
                            }
                        })
                        dispatch({
                            type: GROUP_ADD_MEMBER_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                    if (data.data) {
                        dispatch({
                            type: GROUP_ADD_MEMBER_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                        window.location?.reload()
                    }
                })
        }
        catch (error) {

        }
    }
}


export const groupDelete = (chatId, token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaball.netlify.app/api/chat/group/delete`, {
                method: 'Delete',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId })
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: GROUP_LOADING_DATA,
                        payload: {
                            loading: false,
                        }
                    })
                    if (data?.error) {
                        dispatch({
                            type: GROUP_FAILED_DATA,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                    if (data.data) {
                        dispatch({
                            type: GROUP_SUCCESS_DATA,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                        window.location?.reload()
                    }
                })
        }
        catch (error) {

        }
    }
}
