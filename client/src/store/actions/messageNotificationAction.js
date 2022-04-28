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