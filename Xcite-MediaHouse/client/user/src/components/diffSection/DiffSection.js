import axios from 'axios'
import React, { useState } from 'react'

const DiffSection = ({blogs,latestBlog}) => {
    console.log(blogs);
  return (
    <>
        <div className="section_container">
            <div className="section_container-divOne">
               <div className="imgBx">
                <img src={`https://ichef.bbci.co.uk/news/976/cpsprodpb/1087B/production/_123970776_blurredgraphicdead6.jpg`} alt={blogs[0]?.title} />
               </div>
            </div>
            <div className="section_container-divTwo center-row-left-right">
                <div className="-divTwo__blogsContainer">
                    {
                        React.Children.toArray(
                            blogs.map((e) => {
                                return (
                                    <>
                                        <div className='-divTwo__blogsContainer-blogs'>
                                            <div className="__blogsContainer-blogsSection__top center-row-left-right">
                                                <div className='center-row'>
                                                    <div className="__blogsContainer-blogsSection__avatar"><img src={e?.jounInfo?.avatar} alt={e?.jounInfo?.name} /></div>
                                                    <div className='__blogsContainer-blogsSection__jounInfo center-column'>
                                                        <a href="#">{e?.jounInfo?.name}</a>
                                                        <p className='center-row'><ion-icon name="time-outline"></ion-icon> 1hr ago</p>
                                                    </div>
                                                </div>
                                                <div className="center-row">
                                                    <ion-icon name="ellipsis-vertical"></ion-icon>
                                                </div>
                                            </div>
                                            <div className="hr"></div>
                                            <div className="__blogsContainer-blogsSection__blogData">
                                                <h1>{e?.blogInfo?.title}</h1>
                                                <p>{e?.blogInfo?.description}</p>
                                                <div className="imgBx">
                                                    <img src={e?.blogInfo?.image} alt={e?.blogInfo?.title} />
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                        )
                    }
                </div>
                <div className="-divTwo__latestBlogsContainer">

                </div>
            </div>
        </div>
    </>
  )
}

export default DiffSection