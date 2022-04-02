import actionType from "../constant/actionType";

export const setLoader = (state = {showLoader : false},{type,payload}) => {
    switch(type) {
        case actionType.SET_LOADER : 
            return ({showLoader : payload})
        default : 
            return (state)
    }
}