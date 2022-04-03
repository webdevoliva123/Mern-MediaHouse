import {combineReducers} from 'redux'
import { latestBlogsOfPage, latestBlogsOfWeb, singleBlog, topBusinessBlog, topEconomicBlog, topFiveBlog, topLatestBlog, topNewsBlog, topOthersBlog, topSociologyBlog, topTechBlog } from '../reducers/blogReducers'
import { setLike, setLoader, setSave, setSubs } from '../reducers/extraReducers'
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
    topOthersBlog : topOthersBlog,
    latestBlogsOfPage : latestBlogsOfPage,
    latestBlogsOfWeb : latestBlogsOfWeb,
    getLoader : setLoader,
    singleBlog : singleBlog,
    setLike : setLike,
    setSave : setSave,
    setSubs : setSubs
})



export default comAllReducer