import { GROUP_FAILED_DATA, GROUP_GET_DATA, GROUP_LOADING_DATA, GROUP_SUCCESS_DATA } from "../type/groupType"
export const getGroupChatData = (token) => {
    return (dispatch) => {
        dispatch({
            type: GROUP_LOADING_DATA,
            payload: {
                loading: true,
            }
        })
        fetch('http://localhost:5000/api/chat/', {
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
            fetch('http://localhost:5000/api/chat/group/create', {
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