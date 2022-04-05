import {combineReducers} from 'redux'
import { latestBlogsOfPage, latestBlogsOfWeb, singleBlog, topBusinessBlog, topEconomicBlog, topFiveBlog, topLatestBlog, topNewsBlog, topOthersBlog, topSociologyBlog, topTechBlog } from '../reducers/blogReducers'
import { setLoader,setShareLink } from '../reducers/extraReducers'
import { userAuth, userInfo } from '../reducers/userReducers'
import {jounInfo} from '../reducers/jounReducers'

const comAllReducer = combineReducers({
    userAuth : userAuth,
    userInfo : userInfo,
    jounInfo : jounInfo,
    topLatestBlog : topLatestBlog,
    topFiveBlog : topFiveBlog,
    topNewsBlog : topNewsBlog,
    topBusinessBlog : topBusinessBlog,
    topSociologyBlog : topSociologyBlog,
    topTechBlog : topTechBlog,
    topEconomicBlog : topEconomicBlog,
    topOthersBlog : topOthersBlog,
    latestBlogsOfPage : latestBlogsOfPage,
    latestBlogsOfWeb : latestBlogsOfWeb,
    getLoader : setLoader,
    singleBlog : singleBlog,
    setShareLink : setShareLink,
})



export default comAllReducer