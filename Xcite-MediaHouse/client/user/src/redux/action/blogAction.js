import actionType from "../constant/actionType"

export const getSixLastestBlog = (data) => {
    return (
        {
            type : actionType.SIX_LATEST_BLOG,
            payload : data
        }
    )
}