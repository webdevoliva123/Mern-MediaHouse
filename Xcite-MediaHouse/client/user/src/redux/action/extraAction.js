import actionType from "../constant/actionType"

export const getSetLoaader = (data) => {
    return (
        {
            type : actionType.SET_LOADER,
            payload : data
        }
    )
}

export const getSetLike = (data) => {
    return (
        {
            type : actionType.LIKE,
            payload : data
        }
    )
}

export const getSetSave = (data) => {
    return (
        {
            type : actionType.SAVE,
            payload : data
        }
    )
}

export const getSetSubscribe = (data) => {
    return (
        {
            type : actionType.SUBSCRIBE,
            payload : data
        }
    )
}