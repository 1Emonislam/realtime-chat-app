import { baseUrlLive } from "../../utils/baseUrl"
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
            fetch(`${baseUrlLive}/api/auth/register`, {
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
            fetch(`${baseUrlLive}/api/auth/login`, {
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