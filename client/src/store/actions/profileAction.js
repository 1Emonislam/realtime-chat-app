import { AUTH_SUCCESS } from "../type/authType";
import { PROFILE_FAILED, PROFILE_REQUEST, PROFILE_SUCCESS } from "../type/profileType";

export const getMyProfile = (token) => {
    return async (dispatch) => {
        dispatch({
            type: PROFILE_REQUEST,
            payload: {
                loading: true
            }
        })
        try {
            fetch('http://localhost:5000/api/auth/my/profile', {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: PROFILE_REQUEST,
                        payload: {
                            loading: false,
                        }
                    })
                    if (data) {
                        // console.log(data)
                        dispatch({
                            type: PROFILE_SUCCESS,
                            payload: {
                                data: data
                            }
                        })
                    }
                    if (data?.error) {
                        dispatch({
                            type: PROFILE_FAILED,
                            payload: {
                                error: data.error,
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: PROFILE_REQUEST,
                payload: {
                    loading: false,
                }
            })
            dispatch({
                type: PROFILE_FAILED,
                payload: {
                    error: error.message,
                }
            })
        }
    }
}
export const singleProfileGet = (auth, id) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/api/auth/single/profile/get/${id}`, {
            method: 'get',
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${auth?.user?.token}`
            },
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                dispatch({
                    type: PROFILE_REQUEST,
                    payload: {
                        loading: false,
                    }
                })
                if (data) {

                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: {
                            data: data
                        }
                    })
                }
                if (data?.error) {
                    dispatch({
                        type: PROFILE_FAILED,
                        payload: {
                            error: data.error,
                        }
                    })
                }
            })
    }
}
export const updateProfile = (auth, data) => {
    return (dispatch) => {
        fetch(`http://localhost:5000/api/auth/update`, {
            method: 'PUT',
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${auth?.user?.token}`
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(data => {
                // console.log(data)
                dispatch({
                    type: PROFILE_REQUEST,
                    payload: {
                        loading: false,
                    }
                })
               
                if (data?.data) {
                    dispatch({
                        type: AUTH_SUCCESS,
                        payload: {
                            data: data?.data
                        }
                    })
                    dispatch({
                        type: PROFILE_SUCCESS,
                        payload: {
                            data: data
                        }
                    })
                }
                if (data?.error) {
                    dispatch({
                        type: PROFILE_FAILED,
                        payload: {
                            error: data.error,
                        }
                    })
                }
            })
    }
}