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
            fetch("https://collaballapp.herokuapp.com/api/auth/register", {
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
            fetch("https://collaballapp.herokuapp.com/api/auth/login", {
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
export const resetPassword = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("https://collaballapp.herokuapp.com/api/auth/reset-password", {
                method: "PUT",
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
            fetch("https://collaballapp.herokuapp.com/api/auth/forget-password", {
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
export const changedPassword = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("https://collaballapp.herokuapp.com/api/auth/change-password", {
                method: "PUT",
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
export const logOut = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            // console.log(data)
            fetch("https://collaballapp.herokuapp.com/api/auth/logout", {
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

