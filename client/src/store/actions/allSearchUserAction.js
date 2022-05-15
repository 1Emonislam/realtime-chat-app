import { ALL_SEARCH_LOADING, ALL_SEARCH_USER_FAILED, ALL_SEARCH_USER_SUCCESS } from "../reducers/allSearchUserReducer"

export const allUserSearch = (search, page, setCount, limit, token) => {
    return async (dispatch) => {
        try {
            dispatch({
                type: ALL_SEARCH_LOADING,
                payload: {
                    loading: true,
                }
            })
            fetch(`https://collaballsystem.herokuapp.com/api/auth/all/users/search?search=${search || ''}&page=${page}&limit=${limit}`, {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data) {
                        dispatch({
                            type: ALL_SEARCH_USER_SUCCESS,
                            payload: {
                                message: data.message,
                                data: data
                            }
                        })
                    }
                    setCount(Math.floor(data?.count / limit))
                    if (data?.error) {
                        dispatch({
                            type: ALL_SEARCH_USER_FAILED,
                            payload: {
                                error: data.error
                            }
                        })
                    }
                })
        }
        catch (error) {
            dispatch({
                type: ALL_SEARCH_USER_FAILED,
                payload: {
                    error: error.message
                }
            })
        }
    }
}