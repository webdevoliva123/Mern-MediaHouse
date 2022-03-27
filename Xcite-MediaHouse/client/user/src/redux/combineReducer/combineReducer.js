import {combineReducers} from 'redux'
import { userAuth, userInfo } from '../reducers/userReducers'

const comAllReducer = combineReducers({
    userAuth : userAuth,
    userInfo : userInfo
})



export default comAllReducer