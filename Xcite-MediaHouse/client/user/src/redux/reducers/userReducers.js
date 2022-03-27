import actionType from "../constant/actionType"

const userAuthInitial = {
    loading : false,
    success : "",
    error : "",
    authUser : false
}

const userAuth = (state = userAuthInitial,{type,payload}) => {
    switch(type){
        case actionType.USER_LOGIN_LOADING : 
            return (userAuthInitial.loading = payload , state);
        case actionType.USER_LOGIN_SUCCESS :
            localStorage.setItem("token" , payload);
            return (userAuthInitial.success = payload, state);
        case actionType.USER_SET_IS_USER_AUTH :
            return (userAuthInitial.authUser = payload, state);
        case actionType.USER_LOGIN_ERROR :
            return (userAuthInitial.error = payload, state);
        case actionType.USER_SET_TOKEN:
            return (userAuthInitial.success = payload, state)
    default :
        return state
    }
}




export {
    userAuth
}