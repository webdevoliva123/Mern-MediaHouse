import React, { useEffect } from 'react'
import { Protected } from '../../protected/protected'
const AfterHome = () => {
  // Make This Page Protected
  Protected();

  // Get Some Lastest Blog On
  const get7lastestBlog = () => {
  }

  // Get Some Data When Page Load
  useEffect(() => {
    get7lastestBlog();
  })
  return (
    <>
    <div>Home</div>
    </>
  )
}

export default AfterHome