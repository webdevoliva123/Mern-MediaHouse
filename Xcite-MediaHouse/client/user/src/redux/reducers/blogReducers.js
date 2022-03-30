import actionType from "../constant/actionType";

export const topLatestBlog = (state = {blogs : {}},{type,payload}) => {
    switch(type){
        case actionType.TOP_LATEST_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topFiveBlog = (state = {blogs : {}},{type,payload}) => {
    switch(type){
        case actionType.TOP_FIVE_LATEST_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}