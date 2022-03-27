import {combineReducers} from 'redux'
import { userAuth } from '../reducers/userReducers'

const comAllReducer = combineReducers({
    userAuth : userAuth
})



export default comAllReducer