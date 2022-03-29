import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getSixLastestBlog } from '../../redux/action/blogAction';
import timeSince, { getCurrentTime_Date } from '../../time-ago/time-ago'

const HomeSingleBlog = ({login}) => {
  // 
  const dispatch = useDispatch();
  const [jounName,setJounName] = useState("");
  // Get Some Lastest Blog On
  const get7lastestBlog = async() => {
    await axios({
      method : "GET",
      url : "http://localhost:8080/api/v1/blog/6latestBlogs",
      headers : {
        "Content-Type" : "application",
      }
    }).then((res) => {
      dispatch(getSixLastestBlog(res.data.data))
    })
  }

  // Get Some Data When Page Load
  useEffect(() => {
    get7lastestBlog();
  },[])

  // getIn Data
  const latestBlog = useSelector((state) => state.sixLatestBlog.blogs);

  //get journalist
  const jounId = latestBlog[0]?.jounId; 
  //get journalist
  useEffect(async() => {
    await axios({
        method : "GET",
        url : `http://localhost:8080/api/v2/joun/search/${jounId}`,
        headers : {
            "Content-Type" : "application/json"
        }
    }).then((res) => {
        setJounName(res.data.data.name)
    })
  },[jounId]) 
  
  // get posted time    
  const postAt = timeSince(new Date(latestBlog[0]?.createdAt));

  //get current Time&Date   
  const timeAndDate = getCurrentTime_Date(new Date());

  console.log(timeAndDate);

  return (
    <div className="lastestSingleBlog__container">
        <div className="lastestSingleBlog__container-imgBx">
            <img src={latestBlog[0]?.image}  alt={latestBlog[0]?.title}/>
        </div>
        <div className="lastestSingleBlog__container-content">
            <div>
                <h1 className='lastestSingleBlog__container-Date_Time'>{timeAndDate?.date}<span>/</span>{timeAndDate?.mon}<span>/</span>{timeAndDate?.yr} <span className='lastestSingleBlog__container-Date_Time-devider'>-</span> {timeAndDate?.hr < 10 ? `0${timeAndDate?.hr}` : timeAndDate?.hr}:{timeAndDate?.min} <span className='lastestSingleBlog__container-Date_Time-day_night'>{timeAndDate?.hr < 12 ? `AM` : `PM`}</span></h1>
                <span className='lastestSingleBlog__container-content__title'>{latestBlog[0]?.title}</span>
                <p className='lastestSingleBlog__container-content__description'>{latestBlog[0]?.description}</p>
                <div>
                    <p className='lastestSingleBlog__container-content__auth center-row-left' ><ion-icon name="pencil-outline"></ion-icon> Journalist : <span>{jounName}</span></p>
                    <p className='lastestSingleBlog__container-content__creaAt center-row-left'><ion-icon name="time-outline"></ion-icon> Post At : <span>{postAt} ago</span></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default HomeSingleBlog