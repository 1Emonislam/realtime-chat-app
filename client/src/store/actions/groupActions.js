import { GROUP_FAILED_DATA, GROUP_LOADING_DATA, GROUP_SUCCESS_DATA } from "../type/groupType"

export const getGroupData = (data, token) => {
    return (dispatch) => {
        fetch('https://collaballapp.herokuapp.com/api/chat/group/create', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
            })
    }
}
export const postGroupData = (data, token, reset) => {
    // console.log(data,token)
    return async (dispatch) => {
        try {
            dispatch({
                type: GROUP_LOADING_DATA,
                payload: {
                    loading: true,
                }
            })
            fetch('https://collaballapp.herokuapp.com/api/chat/group/create', {
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