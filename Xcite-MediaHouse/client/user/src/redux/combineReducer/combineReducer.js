import {combineReducers} from 'redux'
import { sixLatestBlog } from '../reducers/blogReducers'
import { userAuth, userInfo } from '../reducers/userReducers'

const comAllReducer = combineReducers({
    userAuth : userAuth,
    userInfo : userInfo,
    sixLatestBlog : sixLatestBlog
})



export default comAllReducer