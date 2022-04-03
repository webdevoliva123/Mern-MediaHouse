import actionType from "../constant/actionType";

export const setLoader = (state = {showLoader : false},{type,payload}) => {
    switch(type) {
        case actionType.SET_LOADER : 
            return ({showLoader : payload})
        default : 
            return (state)
    }
}

export const setLike = (state = {showLike : false},{type,payload}) => {
    switch(type) {
        case actionType.LIKE : 
            return ({showLike : payload})
        default : 
            return (state)
    }
}

export const setSave = (state = {showSave : false},{type,payload}) => {
    switch(type) {
        case actionType.SAVE : 
            return ({showSave : payload})
        default : 
            return (state)
    }
}

export const setSubs = (state = {showSubs : false},{type,payload}) => {
    switch(type) {
        case actionType.SUBSCRIBE : 
            return ({showSubs : payload})
        default : 
            return (state)
    }
}