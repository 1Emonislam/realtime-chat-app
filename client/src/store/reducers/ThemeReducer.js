import { THEME_DARK, THEME_LIGHT } from "../type/themeType";

const themeState = {
    theme: window.localStorage.getItem('themeCurrent') && JSON.parse(window.localStorage.getItem('themeCurrent'))
}
export const themeReducer = (state = themeState, action) => {
    const { payload, type } = action;
    if (type === THEME_DARK) {
        return {
            ...state,
            theme: payload.theme
        }
    }
    if (type === THEME_LIGHT) {
        return {
            ...state,
            theme: payload.theme
        }
    }
    return state;
}