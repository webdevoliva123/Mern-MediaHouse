import React, { useEffect, useState } from "react";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";
import timeSince, { numFormatter } from "../../time-ago/time-ago";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {getJounInfo} from '../../redux/action/jounAction'
import { getShareLink } from "../../redux/action/extraAction";

const JounProfile = () => {
    const {id} = useParams();
    const dispatch = useDispatch();
    const [moreOption,setMoreOption] = useState(false);

    const userInfo = useSelector((state) => state?.userInfo?.userInfoInitial);
    const token = useSelector((state) => state.userAuth.success)

    const JounInfo = async() => {
        await axios({
            method : "GET",
            url : `http://localhost:8080/api/v2/joun/${id}/user/${userInfo?.id}`,
            headers : {
                "Content-Type" : "application/json"
            }
        }).then((res) => {
           dispatch(getJounInfo(res?.data?.data))
        })
    }

    useEffect(() => {
        // getJounProfile
        JounInfo();
    })

    
    // all Joun blog
    const journalist = useSelector((state) => state?.jounInfo?.data);

    // Share joun profile
    const shareJoun = () => {
        dispatch(getShareLink({share : true, link : `http://${window.location.host}/journalist/${id}`}))
    }

    const subscribe = async() => {
        const body = JSON.stringify({
            "jounId" : id,
            "userId" : userInfo?.id
        })

        if(journalist?.isThisUserSubs === false){
            await axios({
                method : "PUT",
                url : `http://localhost:8080/api/v1/user/cont/subscribe`,
                headers : {
                    "Content-Type" : "application/json",
                    "x-access-token" : token
                },
                data : body
            })
        }else{
            await axios({
                method : "PUT",
                url : `http://localhost:8080/api/v1/user/cont/unsubscribe`,
                headers : {
                    "Content-Type" : "application/json",
                    "x-access-token" : token
                },
                data : body
            })
        }
    }

    return (
      <div className="JounContainer">
        <div className="__body">
          <div className="__header center-row-left-right">
            <div className="center-row-left">
            <div className="__profile-pic">
              <Avatar
                alt={journalist?.name}
                src={journalist?.avatar}
                sx={{ width: "20vmin", height: "20vmin" }}
              />
            </div>
            <div className="__details">
              <h1>{journalist?.name}</h1>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <h5>{`${numFormatter(journalist?.totalSubs)} subscribers`}</h5>
                <Button
                  style={journalist?.isThisUserSubs !== true ? { background: "var(--crimson)", marginLeft: "10px" } : { background: "var(--darker-gery)", marginLeft: "10px" }}
                  variant="contained"
                  onClick={subscribe}
                >
                  {journalist?.isThisUserSubs !== true ? `Subscribe` : `subscribed`}
                </Button>
              </div>
            </div> 
            </div>
            <div className="__share-btn" style={{position:"relative"}}>
                <span className="__moreOption center-row" onClick={() => {setMoreOption(!moreOption)}} style={{cursor:"pointer"}}>
                    <ion-icon name="ellipsis-vertical" size="large"></ion-icon>
                </span>
                <div style={moreOption === true ? {position:'absolute',width:"100px",top:"-50px",left:"-100px",background:"var(--black)",padding:"10px 0",display:"block"} : {display:'none',visibility:"hidden"}}>
                          <span style={{background:"var(--primary-color)",width:"100%",padding:"5px 10px",display:"block",color:"var(--lighter-grey)",fontWeight:"300",fontSize:"0.8em",cursor:"pointer"}} onClick={shareJoun} >Share</span>
                    </div>
            </div>
            </div>
        </div>
        <div className="__JounBlogs">
            <div className="__JounBlogs-container">
            {
            React.Children.toArray(journalist?.jounBlogs?.map((e) => {
                return (
                    <>  
                        <a href={`/blog/${e?._id}`}>
                        <div className="HomeLatestBlog__container-div">
                            <div className="imgBx">
                                <img src={e?.image} alt={e?.title} />
                            </div>
                            <div className="content">
                                <div>
                                    <span className='HomeLatestBlog__container-div-title'>{e?.title}</span>
                                    <p className='HomeLatestBlog__container-div-description'>{e?.description}</p>
                                </div>
                                <div className='HomeLatestBlog__container-div-exInfo center-row-left'>
                                    <p className='center-row'><ion-icon name="time-outline"></ion-icon> {`${timeSince(new Date(e?.createdAt))} ago`}</p>
                                </div>
                            </div>
                        </div>
                        </a>
                    </>
                )
            }))
        }
            </div>
        </div>
      </div>
    );
}

export default JounProfile