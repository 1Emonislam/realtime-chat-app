import jwt_decoded from 'jwt-decode';
import { AUTH_FAILED, AUTH_LOADING, AUTH_SUCCESS } from "../type/authType";
export const userVerify = (data) => {
    const tokenDecoded = jwt_decoded(data?.token);
    const expTime = new Date(tokenDecoded * 1000);
    if (new Date() > expTime) {
        window.localStorage?.removeItem("userCurrent")
        return null
    }
    return data;
}
export const userRegister = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: AUTH_LOADING,
                payload: {
                    loading: true,
                }
            })
            fetch("https://collaballsystem.herokuapp.com/api/auth/register", {
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
            fetch("https://collaballsystem.herokuapp.com/api/auth/login", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            }).then(res => res.json())
                .then(data => {
                    // console.log(data)
                    const token = window?.localStorage?.getItem('inviteToken') ? JSON.parse(window.localStorage.getItem('inviteToken')) : null;
                    if (data?.data) {
                        dispatch({
                            type: AUTH_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                        reset()
                        window?.localStorage?.setItem("userInfoCurrent", JSON.stringify(data?.data))
                        if (token) {
                            window.localStorage?.removeItem('inviteToken');
                            window.location?.replace(`/group/invite/${token}`);
                        } else {
                            window.location?.replace('/chat');
                        }
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

export const logOut = () => {
    return (dispatch) => {
        window.localStorage?.removeItem('userInfoCurrent');
        try {
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    message: 'Log Out Successfully ',
                    data: ''
                }
            })
        }
        catch (error) {
            dispatch({
                type: AUTH_SUCCESS,
                payload: {
                    message: 'Log Out Successfully ',
                    data: ''
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
            fetch("https://collaballsystem.herokuapp.com/api/auth/reset-password", {
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
            fetch("https://collaballsystem.herokuapp.com/api/auth/forget-password", {
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
            fetch("https://collaballsystem.herokuapp.com/api/auth/change-password", {
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
