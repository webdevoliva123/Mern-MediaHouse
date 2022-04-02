import React, { useState } from 'react'
import timeSince from '../../time-ago/time-ago'

const DiffSection = ({title,blogs,latestBlog}) => {
    const [showBlogs,setShowBlogs] = useState(20);
  return (
    <>
        <div className="section_container">
            <div className="section_container-divOne">
               <div className="imgBx">
                <img src={blogs[0]?.blogInfo?.image} alt={blogs[0]?.blogInfo?.title} />
               </div>
               <div className="-divOne__content center-row-left">
                    <div>
                        <h1>{title}</h1>
                    </div>
               </div>
            </div>
            <div className="section_container-divTwo center-row-left-right">
                <div className="-divTwo__blogsContainer">
                    {
                        React.Children.toArray(
                            blogs.map((e,i) => {
                                if(i < showBlogs){
                                    return (
                                        <>
                                           <div className='-divTwo__blogsContainer-blogs'>
                                                <div className="__blogsContainer-blogsSection__top center-row-left-right">
                                                    <div className='center-row'>
                                                        <div className="__blogsContainer-blogsSection__avatar"><img src={e?.jounInfo?.avatar} alt={e?.jounInfo?.name} /></div>
                                                        <div className='__blogsContainer-blogsSection__jounInfo center-column'>
                                                            <a href={`/journalist/${e?.jounInfo?._id}`}>{e?.jounInfo?.name}</a>
                                                            <p className='center-row'><ion-icon name="time-outline"></ion-icon> {`${timeSince(new Date(e?.blogInfo?.createdAt))} ago`}</p>
                                                        </div>
                                                    </div>
                                                    <div className="center-row">
                                                        <ion-icon name="ellipsis-vertical"></ion-icon>
                                                    </div>
                                                </div>
                                                <div className="hr"></div>
                                                <a href={`/blog/${e?.blogInfo?._id}`}>
                                                    <div className="__blogsContainer-blogsSection__blogData">
                                                        <h1>{e?.blogInfo?.title}</h1>
                                                        <p>{e?.blogInfo?.description}</p>
                                                        <div className="imgBx">
                                                            <img src={e?.blogInfo?.image} alt={e?.blogInfo?.title} />
                                                        </div>
                                                    </div>
                                             </a>
                                            </div>
                                        </>
                                    )
                                }
                            })
                        )
                    }
                {
                    blogs.length > 20 ? <>
                    <div className='center-row' style={{width:"100%",marginTop:"40px"}}>
                    <button style={{
                        padding:"12px 30px",
                        border:"none",
                        outline:"none",
                        background:"var(--crimson)",
                        color:"var(--white)",
                        borderRadius:"2px",
                        cursor:"pointer"
                        }} onClick={() => {setShowBlogs(showBlogs + 20)}}>View More</button>
                    </div>
                    </> : null
                }
                </div>
                <div className="-divTwo__latestBlogsContainer .center-column-left">
                    <h1>Latest Blogs</h1>
                    {
                        React.Children.toArray(
                            latestBlog.map((e,i) => {
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

export default DiffSection