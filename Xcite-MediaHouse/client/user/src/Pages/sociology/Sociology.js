import axios from 'axios';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import DiffSection from '../../components/diffSection/DiffSection'
import { Protected } from '../../protected/protected';
import { getLatestBlogsOfPage, getLatestBlogsOfWeb } from '../../redux/action/blogAction';

const Sociology = () => {
  // Make This Page Protected
  Protected();

  // 
  const dispatch = useDispatch();

  // Get Token From REdux
  const token = useSelector((state) => state.userAuth.success);

  // Get Business Blog from api
  const blogs = async() => {
    await axios({
      method : "GET",
      url : "http://localhost:8080/api/v1/blog/sociologyBlogs",
      headers : {
        "Content-Type" : "application/json",
        "x-access-token" : token
      }
    }).then((res) => {
      dispatch(getLatestBlogsOfPage(res.data.data))
    })
  }

  const latestBlogs = async() => {
    await axios({
      method : "GET",
      url : "http://localhost:8080/api/v1/blog/allBlogs",
      headers : {
        "Content-Type" : "application/json",
        "x-access-token" : token
      }
    }).then((res) => {
      dispatch(getLatestBlogsOfWeb(res.data.data));
    })
  } 

  // Call all API on useEffect
  useEffect(() => {
    // Get Blogs
    blogs();
    latestBlogs();
  },[])

  // Get Blogs from React-Redux
  const blogsOfPage = useSelector((state) => state.latestBlogsOfPage.blogs);
  const latestBlog =  useSelector((state) => state.latestBlogsOfWeb.blogs);

  return (
    <>
      <DiffSection title={`Sociology Blogs`} blogs={blogsOfPage ? blogsOfPage : []} latestBlog={latestBlog ? latestBlog : []}/>
    </>
  )
}

export default Sociology