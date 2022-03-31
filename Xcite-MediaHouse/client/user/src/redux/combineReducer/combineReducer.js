import {combineReducers} from 'redux'
import { topBusinessBlog, topEconomicBlog, topFiveBlog, topLatestBlog, topNewsBlog, topOthersBlog, topSociologyBlog, topTechBlog } from '../reducers/blogReducers'
import { userAuth, userInfo } from '../reducers/userReducers'

const comAllReducer = combineReducers({
    userAuth : userAuth,
    userInfo : userInfo,
    topLatestBlog : topLatestBlog,
    topFiveBlog : topFiveBlog,
    topNewsBlog : topNewsBlog,
    topBusinessBlog : topBusinessBlog,
    topSociologyBlog : topSociologyBlog,
    topTechBlog : topTechBlog,
    topEconomicBlog : topEconomicBlog,
    topOthersBlog : topOthersBlog
})



export default comAllReducer