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