import { DASHBOARD_GRAPH, DASHBOARD_GRAPH_LOADING } from "../reducers/GraphReducer"

export const getGraphDahboardData = ( token) => {
    // console.log(data,token)
    return async (dispatch) => {
        dispatch({
            type: DASHBOARD_GRAPH_LOADING,
            payload: {
                loading: true,
            }
        })
        try {
            fetch('https://collaballapp.herokuapp.com/api/graph/dashboard', {
                method: 'GET',
                headers: {
                    'Content-Type': "application/json",
                    "authorization": `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then(data => {
                    dispatch({
                        type: DASHBOARD_GRAPH,
                        payload: {
                            todayDate: data?.todayDate,
                            weekDate: data?.weekDate,
                            today: data?.today,
                            week: data?.week,
                            loading: false
                        }
                    })
                })
        }
        catch (error) {
        }
    }
}