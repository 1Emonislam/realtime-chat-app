import React from 'react'
import { useEffect, useDispatch } from 'react'
import axios from 'axios'
import { WEEK_MSG_COUNT } from '../../store/reducers/GraphReducer'
function MessageAvg() {
    const dispatch = useDispatch()
    useEffect(() => {
        const config = {
            headers: {
                'Content-Type': 'Application/json'
            }
        }
        axios.get('https://chalechat.herokuapp.com/graph/toWeekMessage', config).then(({ data }) => {
            dispatch({
                type: WEEK_MSG_COUNT,
                payload: {
                    weekMsgCount: data?.data?.msgCount,
                    toWeek: data?.data?.toWeek,
                }
            })
        })
    }, [dispatch])
    return (
        <div>

        </div>
    )
}

export default MessageAvg