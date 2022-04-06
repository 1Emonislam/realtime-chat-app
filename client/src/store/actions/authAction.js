import { baseUrl } from "../../utils/baseUrl"
import { REGISTER_FAIL, REGISTER_LOADING, REGISTER_SUCCESS } from "../type/authType"

export const userRegister = (data, reset) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: REGISTER_LOADING,
                payload: {
                    loading: true,
                }
            })
            fetch(`${baseUrl}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    if (data?.data) {
                        reset()
                        dispatch({
                            type: REGISTER_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data.data
                            }
                        })
                    }
                    if (data?.error) {
                        reset()
                        dispatch({
                            type: REGISTER_FAIL,
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
                type: REGISTER_FAIL,
                payload: {
                    error: error.message
                }
            })
        }
    }
}