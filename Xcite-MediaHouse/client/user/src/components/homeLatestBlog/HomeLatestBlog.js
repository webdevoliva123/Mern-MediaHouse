import React, {useEffect, useState} from 'react'
import axios from 'axios'
import Headings from '../headings/Headings'
import { useDispatch, useSelector } from 'react-redux'
import { getTopFiveBlog } from '../../redux/action/blogAction'
const HomeLatestBlog = () => {
    // 
    const dispatch = useDispatch();
    // get latest five Blog
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

    // Get Data When UseEffect
    useEffect(() => {
      fiveLatestBlog();
    },[])

    
    // Get Top Five Latest Blog
    const latestBlog = useSelector((state) => state?.topFiveBlog?.blogs);

    
  return (
    <>
        <Headings title={"Latest Blog"}/>
        <div className="HomeLatestBlog__container">
            <div className="HomeLatestBlog__container-div" id="HomeLatestBlog__container-div__one">
                <div className="imgBx">
                    <img src={latestBlog[0]?.image} alt={latestBlog[0]?.title} />
                </div>
                <div className="content">
                    <div>
                        <span className='HomeLatestBlog__container-div-title'>{latestBlog[0]?.title}</span>
                        <p className='HomeLatestBlog__container-div-description'>{latestBlog[0]?.description}</p>
                    </div>
                </div>
            </div>
            <div className="HomeLatestBlog__container-div" id="HomeLatestBlog__container-div__two">
                <div className="imgBx">
                    <img src={latestBlog[0]?.image} alt={latestBlog[0]?.title} />
                </div>
                <div className="content">
                    <div>
                        <span className='HomeLatestBlog__container-div-title'>{latestBlog[0]?.title}</span>
                        <p className='HomeLatestBlog__container-div-description'>{latestBlog[0]?.description}</p>
                    </div>
                </div>
            </div>
            <div className="HomeLatestBlog__container-div" id="HomeLatestBlog__container-div__three">
                <div className="imgBx">
                    <img src={latestBlog[0]?.image} alt={latestBlog[0]?.title} />
                </div>
                <div className="content">
                    <div>
                        <span className='HomeLatestBlog__container-div-title'>{latestBlog[0]?.title}</span>
                        <p className='HomeLatestBlog__container-div-description'>{latestBlog[0]?.description}</p>
                    </div>
                </div>
            </div>
            <div className="HomeLatestBlog__container-div" id="HomeLatestBlog__container-div__four">
                <div className="imgBx">
                    <img src={latestBlog[0]?.image} alt={latestBlog[0]?.title} />
                </div>
                <div className="content">
                    <div>
                        <span className='HomeLatestBlog__container-div-title'>{latestBlog[0]?.title}</span>
                        <p className='HomeLatestBlog__container-div-description'>{latestBlog[0]?.description}</p>
                    </div>
                </div>
            </div>
            <div className="HomeLatestBlog__container-div" id="HomeLatestBlog__container-div__five">
                <div className="imgBx">
                    <img src={latestBlog[0]?.image} alt={latestBlog[0]?.title} />
                </div>
                <div className="content">
                    <div>
                        <span className='HomeLatestBlog__container-div-title'>{latestBlog[0]?.title}</span>
                        <p className='HomeLatestBlog__container-div-description'>{latestBlog[0]?.description}</p>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default HomeLatestBlog