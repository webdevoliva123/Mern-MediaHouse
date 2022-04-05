import actionType from "../constant/actionType"

export const getJounInfo = (data) => {
    return {
        type : actionType.JUN_INFO,
        payload : data
    }
}