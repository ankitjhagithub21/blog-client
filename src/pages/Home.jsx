import React, { useEffect } from 'react'
import Blogs from './Blogs'
const Home = ({getUserFromServer}) => {
 
 
  useEffect(()=>{
    getUserFromServer()
  },[])
  
  return (
    <div>
      <Blogs/>
    </div>
  )
}

export default Home
