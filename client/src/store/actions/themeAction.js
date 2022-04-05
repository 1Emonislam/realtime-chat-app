import { THEME_DARK, THEME_LIGHT } from "../type/themeType"

export const themeAction = (theme) => {
    return async (dispatch) => {
        // console.log(theme)
        if (theme === true) {
            dispatch({
                type: THEME_DARK,
                payload: { theme: 'dark' }
            })
        } if (theme === false) {
            dispatch({
                type: THEME_LIGHT,
                payload: { theme: 'light' }
            })
        }
    }
}