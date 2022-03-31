import React from 'react'
import { useParams } from 'react-router-dom'
import {Protected} from '../../protected/protected'

const SingleBlog = () => {
  Protected()

  //GOT Blog ID From Url   
  const { id } = useParams();

  return (
    <div>{`blog id : ${id}`}</div>
  )
}

export default SingleBlog