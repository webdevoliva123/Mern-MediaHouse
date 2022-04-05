import actionType from "../constant/actionType";

export const jounInfo = (state = {},{type,payload}) => {
    switch(type){
        case actionType.JUN_INFO:
            return ({data : payload})
        default : 
            return (state)
    }
}