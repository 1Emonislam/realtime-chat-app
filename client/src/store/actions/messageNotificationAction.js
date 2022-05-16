import { NOTIFICATION_GET } from "../type/messageNotificationTypes"
export const getNotification = (token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaballapp.herokuapp.com/api/get/notification`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        //console.log(data)
                        dispatch({
                            type: NOTIFICATION_GET,
                            payload: {
                                data: data,
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }
}
export const removeNotificationDB = (chatId, messageId, token) => {
    return async (dispatch) => {
        // console.log(chatId, messageId)
        try {
            fetch(`https://collaballapp.herokuapp.com/api/already/notification`, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ chatId, messageId })
            })
                .then(res => res.json())
                .then(data => {
                })
        }
        catch (error) {
        }
    }
}
export const getNotificationUnSeenList = (token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaballapp.herokuapp.com/api/get/notificationUnseen`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        //console.log(data)
                        dispatch({
                            type: NOTIFICATION_GET,
                            payload: {
                                data: data,
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }
}
export const getNotificationSeenList = (token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaballapp.herokuapp.com/api/get/notificationSeen`, {
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
                            type: NOTIFICATION_GET,
                            payload: {
                                data: data,
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }
}
export const getSingleNotification = (chatId, token) => {
    return async (dispatch) => {
        try {
            fetch(`https://collaballapp.herokuapp.com/api/get/notification/${chatId}`, {
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
                            type: NOTIFICATION_GET,
                            payload: {
                                data: data,
                            }
                        })
                    }
                })
        }
        catch (error) {
        }
    }
}