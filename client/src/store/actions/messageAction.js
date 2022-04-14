import { GET_MESSAGE } from "../type/messageTypes"
export const getMessage = (id, token) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/api/message/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json",
                "authorization": `Bearer ${token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                if (data) {
                    console.log(data)
                    dispatch({
                        type: GET_MESSAGE,
                        payload: {
                            message: data.data,
                        }
                    })
                }
            })
    }
}