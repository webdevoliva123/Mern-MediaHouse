import actionType from "../constant/actionType"

export const getSetLoaader = (data) => {
    return (
        {
            type : actionType.SET_LOADER,
            payload : data
        }
    )
}

export const getShareLink = (data) => {
    return{
        type : actionType.SHARE_LINK,
        payload : data
    }
}



