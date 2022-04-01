import React from 'react'
import Headings from '../headings/Headings'
import timeSince from '../../time-ago/time-ago'
const HomeLatestBlog = ({blogs,section,login}) => {

  return (
    <>
        <Headings title={section}/>
        <div className="HomeLatestBlog__container">
        {
            React.Children.toArray(blogs.map((e) => {
                return (
                    <>  
                        <a href={login === true ? `/blog/${e?._id}` : `/signIn`}>
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
    </>
  )
}

export default HomeLatestBlog