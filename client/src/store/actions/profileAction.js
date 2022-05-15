import { PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_FAILED } from "../type/profileType";

export const getMyProfile = (token) => {
    return async (dispatch) => {
        dispatch({
            type: PROFILE_REQUEST,
            payload: {
                loading: true
            }
        })
        try {
            fetch('https://collaballapp.herokuapp.com/api/auth/my-profile', {
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