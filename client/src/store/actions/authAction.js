import axios from "axios";
import { baseUrl } from "../../utils/baseUrl"
import { REGISTER_FAIL, REGISTER_SUCCESS } from "../type/authType"

export const userRegister = (data, reset) => {
    return async (dispatch) => {
        try {

            fetch(`${baseUrl}/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
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
                    if (data.error) {
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