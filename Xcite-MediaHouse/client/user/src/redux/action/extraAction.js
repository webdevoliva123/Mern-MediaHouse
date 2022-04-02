import actionType from "../constant/actionType"

export const getSetLoaader = (data) => {
    return (
        {
            type : actionType.SET_LOADER,
            payload : data
        }
    )
}