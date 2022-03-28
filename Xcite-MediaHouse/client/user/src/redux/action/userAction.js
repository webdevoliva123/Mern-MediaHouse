import actionType from "../constant/actionType"

export const getLoading = (data) => {
    return {
        type : actionType.USER_LOGIN_LOADING,
        payload : data
    }
}

export const getSuccess = (data) => {
    return {
        type : actionType.USER_LOGIN_SUCCESS,
        payload : data
    }
}
    
export const getError = (data) => {
    return {
        type : actionType.USER_LOGIN_ERROR,
        payload : data
    }
}

export const getSetToken = (data) => {
    return {
        type : actionType.USER_SET_TOKEN,
        payload : data
    }
}


export const getUserInfo = (data) => {
    return {
        type : actionType.USER_INFO,
        payload :  data
    }
}