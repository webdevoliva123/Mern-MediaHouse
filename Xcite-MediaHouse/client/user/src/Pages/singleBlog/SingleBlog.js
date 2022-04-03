import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import {Protected} from '../../protected/protected'
import { getLatestBlogsOfWeb, getSingleBlogData } from '../../redux/action/blogAction'
import { getSetLoaader } from '../../redux/action/extraAction'
import { numFormatter } from '../../time-ago/time-ago'

const SingleBlog = () => {
  Protected()

  //GOT Blog ID From Url   
  const { id } = useParams();

  // Get Token From React Redux
  const token = useSelector((state) => state.userAuth.success);
  // Get User Id From React Redux
  const userId = useSelector((state) => state.userInfo.userInfoInitial.id);

  // 
  const dispatch = useDispatch();

  // get Blog data
  const getBlog = async() => {
    await axios({
      method : "POST",
      url : `http://localhost:8080/api/v1/blog/${id}`,
      headers : {
        "Content-Type" : "application/json",
        "x-access-token" : token
      },
      data : JSON.stringify({
        userId : userId
      })
    }).then((res) => {
      dispatch(getSingleBlogData(res.data.data))
    }).catch((err) => {
      console.log(err);
    })
  }

  const latestBlogs = async() => {
    dispatch(getSetLoaader(true))
    await axios({
      method : "GET",
      url : "http://localhost:8080/api/v1/blog/allBlogs",
      headers : {
        "Content-Type" : "application/json",
        "x-access-token" : token
      }
    }).then((res) => {
      dispatch(getLatestBlogsOfWeb(res.data.data));
      dispatch(getSetLoaader(false))
    })
    dispatch(getSetLoaader(false))
  } 

  useEffect(() => {
    // Get Blog From Api by Blog Id which get from user paramas
    getBlog();
    latestBlogs();
  },[])

  // get blog data from React redux
  const blog = useSelector((state) => state?.singleBlog?.blog);
  const latestBlog = useSelector((state) => state?.latestBlogsOfWeb?.blogs); 
  let blogs;

  if(latestBlog){
    blogs = latestBlog;
  }else{
    blogs = [];
  }

  // counting Total length
  const likes = blog?.blogInfo?.foundBlog?.likes;


  const likeFun = async() => {
    const body = JSON.stringify({
      blogId : id,
      userId : userId
    })
    if(blog?.blogInfo?.thieUserLiked !== true){
      await axios({
        method : "PUT",
        url : "http://localhost:8080/api/v1/user/blog/like",
        headers : {
          "Content-Type" : "application/json",
          "x-access-token" : token
        },
        data : body
      }).then(() => {
        window.location.reload();
      })
    }else{
      await axios({
        method : "PUT",
        url : "http://localhost:8080/api/v1/user/blog/removeLike",
        headers : {
          "Content-Type" : "application/json",
          "x-access-token" : token
        },
        data : body
      }).then(() => {
        window.location.reload();
      })
    }
  }

  const saveFun = async() => {
    const body = JSON.stringify({
      userId : userId
    })
    if(blog?.blogInfo?.thisUserSaved !== true){
      await axios({
        method : "PUT",
        url : `http://localhost:8080/api/v1/user/blog/save/${id}`,
        headers : {
          "Content-Type" : "application/json",
          "x-access-token" : token
        },
        data : body
      }).then(() => {
        window.location.reload();
      })
    }else{
      await axios({
        method : "PUT",
        url : `http://localhost:8080/api/v1/user/blog/unsave/${id}`,
        headers : {
          "Content-Type" : "application/json",
          "x-access-token" : token
        },
        data : body
      }).then(() => {
        window.location.reload();
      })
    }
  }



  return (
    <>
     <div className="section_container">
            <div className="section_container-divOne">
               <div className="imgBx">
                <img src={blog?.blogInfo?.foundBlog?.image} alt={blog?.blogInfo?.foundBlog?.title} />
               </div>
            </div>
            <div className="section_container-divTwo center-row-left-right">
                <div className="-divTwo__blogsContainer __singleBlogContainer">
                  <div className="__singleBlogContainer-header center-row-left-right">
                    <div className='center-row'>
                      <div className='__jounAvatar'>
                        <img src={blog?.jounInfo?.avatar} alt={blog?.jounInfo?.name} />
                      </div>
                      <div className='__jounInfo center-row-left'>
                        <div>
                          <span>{blog?.jounInfo?.name}</span>
                          <div className='__jounSubsInfo'><span> {numFormatter(blog?.jounInfo?.subscriber)} subscriber</span> </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div className='__shareBlog'>
                        <ion-icon name="ellipsis-vertical"></ion-icon>
                      </div>
                    </div>
                  </div>
                  <div className="__singleBlogContainer-body">
                    <h2>{blog?.blogInfo?.foundBlog?.title}</h2>
                    <h4>{blog?.blogInfo?.foundBlog?.description}</h4>
                    <div className="imgBx">
                      <img src={blog?.blogInfo?.foundBlog?.image} alt={blog?.blogInfo?.foundBlog?.title} />
                    </div>
                    <p>
                      {blog?.blogInfo?.foundBlog?.body}
                    </p>
                  </div>
                  <div className="__singleBlogContainer-footer center-row-left">
                    <span className='__info-totalLike'>Total likes <span>{numFormatter(likes ? likes.length : 0)}</span></span>
                    <div className='__controller center-row-left-right'>
                      <div className='center-row-left'>
                      <span className='__liked center-row' onClick={likeFun}> <ion-icon name={blog?.blogInfo?.thieUserLiked === true ? "heart" : "heart-outline"} id={blog?.blogInfo?.thieUserLiked === true ? "liked" : "unliked"}></ion-icon></span>
                      <span className='__save center-row' onClick={saveFun}><ion-icon name={blog?.blogInfo?.thisUserSaved  === true ? "bookmark" : "bookmark-outline"} id={blog?.blogInfo?.thisUserSaved  === true ? "saved" : "unsaved"}></ion-icon></span>
                      </div>
                      <div>
                        <ion-icon name="share-social"></ion-icon>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="-divTwo__latestBlogsContainer .center-column-left">
                    <h1>Latest Blogs</h1>
                    {
                        React.Children.toArray(
                          blogs.map((e,i) => {
                                if(i<20){
                                    return (
                                        <>
                                            <div className='-divTwo__latestBlogsContainer-blogs'>
                                                <div className="imgBx">
                                                    <img src={e?.blogInfo?.image} alt={e?.blogInfo?.title} />
                                                </div>
                                                <a href={`/blog/${e?.blogInfo?._id}`}><span>{e?.blogInfo?.title}</span></a>
                                            </div>
                                        </>
                                    )
                                }
                            })
                        )
                    }
                </div>
            </div>
      </div>
    </>
  )
}

export default SingleBlog