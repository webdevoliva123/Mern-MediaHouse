import actionType from "../constant/actionType"

const userAuthInitial = {
    loading : false,
    success : "",
    error : "",
}

const userAuth = (state = userAuthInitial,{type,payload}) => {
    switch(type){
        case actionType.USER_LOGIN_LOADING : 
            return (userAuthInitial.loading = payload , state);
        case actionType.USER_LOGIN_SUCCESS :
            localStorage.setItem("token" , payload);
            return (userAuthInitial.success = payload, state);
        case actionType.USER_LOGIN_ERROR :
            return (userAuthInitial.error = payload, state);
        case actionType.USER_SET_TOKEN:
            return (userAuthInitial.success = payload, state)
    default :
        return state
    }
}


export const userInfo = (state = { userInfoInitial : {}}, {type,payload}) => {
    switch(type){
        case actionType.USER_INFO:
            localStorage.setItem("userInfo",JSON.stringify(payload))
            return ({userInfoInitial : payload})
        default :
            return state;
    }
}




export {
    userAuth
}