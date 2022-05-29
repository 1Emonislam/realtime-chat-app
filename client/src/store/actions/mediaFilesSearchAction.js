import axios from 'axios'
import store from './../store'
import { STORE_AUDIOS, STORE_IMAGES, STORE_LOADING, STORE_OTHERS, STORE_VIDEOS, STORE_VOICE } from '../reducers/mediaFileSearchReducer'
export const mediaFilesSearchVoice = (status, chat, page, limit, setCount) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${store.getState()?.auth?.user?.token}`
            },
        }
        dispatch({
            type: STORE_LOADING,
            payload: {
                loading: true
            }
        })
        axios.get(`https://collaballapp.herokuapp.com/api/chat/media/files/search?status=${status || ''}&chat=${chat || ''}&page=${page}&limit=${limit}`,config).then(({data}) => {
            dispatch({
                type: STORE_LOADING,
                payload: {
                    loading: false
                }
            })
            if (data.count) {
                setCount(data.count)
            }
            if (data.data) {
                dispatch({
                    type: STORE_VOICE,
                    payload: {
                        voice: data.data
                    }
                })
            }
        })
    }
}
export const mediaFilesSearchAudios = (status, chat, page, limit, setCount) => {

    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${store.getState()?.auth?.user?.token}`
            },
        }
        dispatch({
            type: STORE_LOADING,
            payload: {
                loading: true
            }
        })
        axios.get(`https://collaballapp.herokuapp.com/api/chat/media/files/search?status=${status || ''}&chat=${chat || ''}&page=${page}&limit=${limit}`,config).then(({data}) => {
            dispatch({
                type: STORE_LOADING,
                payload: {
                    loading: false
                }
            })
            if (data.count) {
                setCount(data.count)
            }
            if (data.data) {
                dispatch({
                    type: STORE_AUDIOS,
                    payload: {
                        audios: data.data
                    }
                })
            }
        })
    }
}
export const mediaFilesSearchVideos = (status, chat, page, limit, setCount) => {
    
    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${store.getState()?.auth?.user?.token}`
            },
        }
        dispatch({
            type: STORE_LOADING,
            payload: {
                loading: true
            }
        })
        axios.get(`https://collaballapp.herokuapp.com/api/chat/media/files/search?status=${status || ''}&chat=${chat || ''}&page=${page}&limit=${limit}`,config).then(({data}) => {
            dispatch({
                type: STORE_LOADING,
                payload: {
                    loading: false
                }
            })
            if (data.count) {
                setCount(data.count)
            }
            if (data.data) {
                dispatch({
                    type: STORE_VIDEOS,
                    payload: {
                        videos: data.data
                    }
                })
            }
        })
    }
}
export const mediaFilesSearchOthers = (status,chat, page, limit, setCount) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${store.getState()?.auth?.user?.token}`
            },
        }
        dispatch({
            type: STORE_LOADING,
            payload: {
                loading: true
            }
        })
        axios.get(`https://collaballapp.herokuapp.com/api/chat/media/files/search?status=${status || ''}&chat=${chat || ''}&page=${page}&limit=${limit}`,config).then(({data}) => {
            dispatch({
                type: STORE_LOADING,
                payload: {
                    loading: false
                }
            })
            if (data.count) {
                setCount(data.count)
            }
            if (data.data) {
                dispatch({
                    type: STORE_OTHERS,
                    payload: {
                        others: data.data
                    }
                })
            }
        })
    }
}
export const mediaFilesSearchImages = (status, chat, page, limit, setCount) => {
    return (dispatch) => {
        const config = {
            headers: {
                'Content-Type': "application/json",
                "authorization": `Bearer ${store.getState()?.auth?.user?.token}`
            },
        }
        dispatch({
            type: STORE_LOADING,
            payload: {
                loading: true
            }
        })
        axios.get(`https://collaballapp.herokuapp.com/api/chat/media/files/search?status=${status || ''}&chat=${chat || ''}&page=${page}&limit=${limit}`,config).then(({data}) => {
            dispatch({
                type: STORE_LOADING,
                payload: {
                    loading: false
                }
            })
            if (data.count) {
                setCount(data.count)
            }
            if (data.data) {
                dispatch({
                    type: STORE_IMAGES,
                    payload: {
                        images: data.data
                    }
                })
            }
        })
    }
}
