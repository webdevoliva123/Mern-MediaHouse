import actionType from "../constant/actionType";

export const sixLatestBlog = (state = {blogs : {}},{type,payload}) => {
    switch(type){
        case actionType.SIX_LATEST_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}