import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import HomeLatestBlog from '../../components/homeLatestBlog/HomeLatestBlog';
import HomeSingleBlog from '../../components/homeSingleBlog/HomeSingleBlog';
import HomeTopBlogOfSection from '../../components/homeTopBlogOfSection/HomeTopBlogOfSection';
import { Protected } from '../../protected/protected'
import { getLatestBlogsOfWeb, getTopBusinessBlog, getTopEconomicBlog, getTopFiveBlog, getTopNewsBlog, getTopOthersBlog, getTopSociologyBlog, getTopTechBlog } from '../../redux/action/blogAction';
const AfterHome = () => {
  // Make This Page Protected
  Protected();

      // 
      const dispatch = useDispatch();
     
      //get latest News Blog From React-redux

      // Get latestBlog
      const fiveLatestBlog = async() => {
        await axios({
            method : "GET",
            url : "http://localhost:8080/api/v1/blog/6latestBlogs",
            headers : {
              "Content-Type" : "application",
            }
          }).then((res) => {
            const getData = res.data.data;
            const data = getData.filter((e,i) => {
                if(i > 0){
                    return e
                }
            });
            // Sending Data to store
            dispatch(getTopFiveBlog(data))
          })
    }

      // Get Latest News Blog
      const getNewsBlog = async() => {
          await axios({
              method : "GET",
              url : "http://localhost:8080/api/v1/blog/4latestNewsBlogs",
              headers : {
                  "Content-Type" : "application/json"
              }
          }).then((res) => {
              dispatch(getTopNewsBlog(res.data.data))
          })   
      }

      // Get Latest Business Blog
      const getBusinessBlog = async() => {
        await axios({
            method : "GET",
            url : "http://localhost:8080/api/v1/blog/4latestBusniessBlogs",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            dispatch(getTopBusinessBlog(res.data.data))
        })   
      }

      // Get Latest Sociology Blog
      const getSociologyBlog = async() => {
        await axios({
            method : "GET",
            url : "http://localhost:8080/api/v1/blog/4latestSociologyBlogs",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            dispatch(getTopSociologyBlog(res.data.data))
        })   
      }

      // Get Latest Tech Blog
      const getTechBlog = async() => {
        await axios({
            method : "GET",
            url : "http://localhost:8080/api/v1/blog/4latestTechBlogs",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            dispatch(getTopTechBlog(res.data.data))
        })   
      }

      // Get Latest Economic Blog
       const getEconomicBlog = async() => {
        await axios({
            method : "GET",
            url : "http://localhost:8080/api/v1/blog/4latestEconomicBlogs",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            dispatch(getTopEconomicBlog(res.data.data))
        })   
      }
      
      // Get Latest Economic Blog
       const getOthersBlog = async() => {
        await axios({
            method : "GET",
            url : "http://localhost:8080/api/v1/blog/4latestOtherBlogs",
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
            dispatch(getTopOthersBlog(res.data.data))
        })   
      }
      
      useEffect(() => {
          fiveLatestBlog();
          getNewsBlog();
          getBusinessBlog();
          getSociologyBlog();
          getTechBlog();
          getEconomicBlog();
          getOthersBlog();
      },[])
      
      //
      const latestBlog = useSelector((state) => state?.topFiveBlog?.blogs);
      const newsBlog = useSelector((state) => state?.topNewsBlog?.blogs);
      const businessBlog = useSelector((state) => state?.topBusinessBlog?.blogs);
      const sociologyBlog = useSelector((state) => state?.topSociologyBlog?.blogs);
      const techBlog = useSelector((state) => state?.topTechBlog?.blogs);
      const economicBlog = useSelector((state) => state?.topEconomicBlog?.blogs);
      const othersBlog = useSelector((state) => state?.topOthersBlog?.blogs);

  return (
    <>
      {/* Singe Blog */}
      <HomeSingleBlog login={true}/>
      {/* Latest Blog */}
      <HomeLatestBlog login={true} blogs={latestBlog ? latestBlog : []} section={"Latest Blogs"} />
      {/* All Section With 4 Blogs */}
      <HomeTopBlogOfSection login={true} blogs={newsBlog ? newsBlog : []} section={"News Blogs"}/>
      <HomeTopBlogOfSection login={true} blogs={businessBlog ? businessBlog : []} section={"Business Blogs"}/>
      <HomeTopBlogOfSection login={true} blogs={sociologyBlog ? sociologyBlog : []} section={"Sociology Blogs"}/>
      <HomeTopBlogOfSection login={true} blogs={techBlog ? techBlog : []} section={"Tech Blogs"}/>
      <HomeTopBlogOfSection login={true} blogs={economicBlog ? economicBlog : []} section={"Economic Blogs"}/>
      <HomeTopBlogOfSection login={true} blogs={othersBlog ? othersBlog : []} section={"Other Blogs"}/>
      {/* <Loader /> */}
    </>
  )
}

export default AfterHome