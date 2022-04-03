import actionType from "../constant/actionType";

export const topLatestBlog = (state = {blogs : {}},{type,payload}) => {
    switch(type){
        case actionType.TOP_LATEST_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topFiveBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FIVE_LATEST_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topNewsBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FOUR_NEWS_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topBusinessBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FOUR_BUSINESS_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topSociologyBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FOUR_SOCIOLOGY_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topTechBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FOUR_TECH_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topEconomicBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FOUR_ECONOMIC_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const topOthersBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.TOP_FOUR_OTHER_BLOG :
            return ({blogs : payload})
        default :
            return state
    }
}

export const latestBlogsOfPage = (state = {},{type,payload}) => {
    switch(type){
        case actionType.LATEST_BLOGS_OF_PAGE :
            return ({blogs : payload})
        default :
            return state
    }
}

export const latestBlogsOfWeb = (state = {},{type,payload}) => {
    switch(type){
        case actionType.LATEST_BLOGS_OF_WEB :
            return ({blogs : payload})
        default :
            return state
    }
}

export const singleBlog = (state = {},{type,payload}) => {
    switch(type){
        case actionType.SINGLE_BLOG_DATA : 
            return ({blog : payload})
        default : 
            return state
    }
}