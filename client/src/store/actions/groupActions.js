import { GROUP_SUCCESS_DATA } from "../type/groupType"

export const getGroupData = (data, token) => {
    return (dispatch) => {
        fetch('http://localhost:5000/api/chat/group/create', {
            method: 'POST',
            headers: {
                'Content-Type': "application/json",
                "Authorizaion": `Bearer ${token}`
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
    return (dispatch) => {
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
                        payload: data.message,
                    })
                }
            })
    }
}