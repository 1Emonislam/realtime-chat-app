import { AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS } from "../type/authType"
export const userRegister = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        reset();
                        window.location?.replace("/login")
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        reset()
                        dispatch({
                            type: AUTH_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            reset()
            dispatch({
                type: AUTH_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}
// console.log(baseUrlLive)
export const userLogin = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        reset()
                        window?.localStorage?.setItem("user", JSON.stringify(data?.data))
                        window.location?.replace('/chat');
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        reset()
                        dispatch({
                            type: AUTH_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            reset()
            dispatch({
                type: AUTH_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}

export const logOut = (data, token) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data?.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        dispatch({
                            type: AUTH_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: AUTH_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}


export const resetPassword = (data, reset, token) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("http://localhost:5000/api/auth/reset-password", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        reset()
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        reset()
                        dispatch({
                            type: AUTH_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            reset()
            dispatch({
                type: AUTH_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}
export const forgetPassword = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("http://localhost:5000/api/auth/forget-password", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        reset()
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        reset()
                        dispatch({
                            type: AUTH_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            reset()
            dispatch({
                type: AUTH_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}
export const changedPassword = (data, reset, token) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("http://localhost:5000/api/auth/change-password", {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        reset()
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        reset()
                        dispatch({
                            type: AUTH_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            reset()
            dispatch({
                type: AUTH_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}
