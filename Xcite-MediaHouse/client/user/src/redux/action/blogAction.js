
import actionType from "../constant/actionType"
export const getTopLatestBlog = (data) => {
    return (
        {
            type : actionType.TOP_LATEST_BLOG,
            payload : data
        }
    )
}

export const getTopFiveBlog = (data) => {
    return (
        {
            type : actionType.TOP_FIVE_LATEST_BLOG,
            payload : data
        }
    )
}

export const getTopNewsBlog = (data) => {
    return (
        {
            type :  actionType.TOP_FOUR_NEWS_BLOG,
            payload : data
        }
    )
}

export const getTopBusinessBlog = (data) => {
    return (
        {
            type :  actionType.TOP_FOUR_BUSINESS_BLOG,
            payload : data
        }
    )
}

export const getTopSociologyBlog = (data) => {
    return (
        {
            type :  actionType.TOP_FOUR_SOCIOLOGY_BLOG,
            payload : data
        }
    )
}

export const getTopTechBlog = (data) => {
    return (
        {
            type :  actionType.TOP_FOUR_TECH_BLOG,
            payload : data
        }
    )
}

export const getTopEconomicBlog = (data) => {
    return (
        {
            type :  actionType.TOP_FOUR_ECONOMIC_BLOG,
            payload : data
        }
    )
}

export const getTopOthersBlog = (data) => {
    return (
        {
            type :  actionType.TOP_FOUR_OTHER_BLOG,
            payload : data
        }
    )
}

export const getLatestBlogsOfPage = (data) => {
    return (
        {
            type :  actionType.LATEST_BLOGS_OF_PAGE,
            payload : data
        }
    )
}

export const getLatestBlogsOfWeb = (data) => {
    return (
        {
            type :  actionType.LATEST_BLOGS_OF_WEB,
            payload : data
        }
    )
}

export const getSingleBlogData = (data) => {
    return (
        {
            type : actionType.SINGLE_BLOG_DATA,
            payload : data 
        }
    )
}