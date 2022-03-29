import { useEffect, useState } from "react"

export const useThemes = () =>{
const [theme,setTheme] =useState(JSON.parse(window.localStorage.getItem("theme")))
    useEffect(() =>{
setTheme(JSON.parse(window.localStorage.getItem("theme")))
},[theme]);
return [theme];

}
