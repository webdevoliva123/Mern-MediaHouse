import React from 'react'
import HomeLatestBlog from '../../components/homeLatestBlog/HomeLatestBlog';
import HomeSingleBlog from '../../components/homeSingleBlog/HomeSingleBlog';
import { Protected } from '../../protected/protected'
const AfterHome = () => {
  // Make This Page Protected
  Protected();

  return (
    <>
      {/* Singe Blog */}
      <HomeSingleBlog login={true}/>
      {/* Latest Blog */}
      <HomeLatestBlog login={true}/>
    </>
  )
}

export default AfterHome