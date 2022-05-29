const initState = {
    audios: [],
    videos: [],
    others: [],
    images: [],
    voice: [],
    loading: false,
}
export const STORE_AUDIOS = 'STORE_AUDIOS'
export const STORE_LOADING = 'STORE_LOADING'
export const STORE_VOICE = 'VOICE_VOICE'
export const STORE_VIDEOS = 'STORE_VIDEOS'
export const STORE_IMAGES = 'STORE_IMAGES'
export const STORE_OTHERS = 'STORE_OTHERS'
export const mediaFileSearchReducer = (state = initState, action) => {
    const { payload, type } = action;
    if (type === STORE_AUDIOS) {
        return {
            ...state,
            audios: payload.audios,
        }
    }
    if (type === STORE_VOICE) {
        return {
            ...state,
            voice: payload.voice,
        }
    }
    if (type === STORE_VIDEOS) {
        return {
            ...state,
            videos: payload.videos,
        }
    }
    if (type === STORE_IMAGES) {
        return {
            ...state,
            images: payload.images,
        }
    }
    if (type === STORE_OTHERS) {
        return {
            ...state,
            others: payload.others,
        }
    }
    if (type === STORE_LOADING) {
        return {
            ...state,
            loading: payload.loading,
        }
    }
    return state;
}