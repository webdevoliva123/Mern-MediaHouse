import {combineReducers} from 'redux'
import { topFiveBlog, topLatestBlog } from '../reducers/blogReducers'
import { userAuth, userInfo } from '../reducers/userReducers'

const comAllReducer = combineReducers({
    userAuth : userAuth,
    userInfo : userInfo,
    topLatestBlog : topLatestBlog,
    topFiveBlog : topFiveBlog
})



export default comAllReducer