import { GROUP_SUCCESS_DATA } from "../type/groupType";

const initState = {
    message: '',
    error: '',
    data: {},
}
const groupReducer = async (state=initState,action) => {
    const {payload,type} = action;
    if(type === GROUP_SUCCESS_DATA){
        
    }
}