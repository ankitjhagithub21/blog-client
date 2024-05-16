import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setBlogs } from '../app/slices/blogSlice'
import Blog from '../components/Blog'
import Loader from '../components/Loader'

const Blogs = () => {
  const blogs = useSelector(state=>state.blogs.blogs)
  const [loading,setLoading] = useState(false)
  const dispatch = useDispatch()

  const getAllBlogs = async () => {

    try {
      setLoading(true)
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs`)
      const data = await res.json()
      if(data.success){
        dispatch(setBlogs(data.blogs))
      }
    }catch(error){
      console.error(error.message);
    }finally{
      setLoading(false)
    }
  }
  
  useEffect(() => {
    getAllBlogs()
  }, [])
  
  if(loading){
    return <Loader/>
  }

  return (
    <div className='container my-5'>
      <h2 className='text-center mt-5'>Latest Blogs</h2>
     <div className="row py-5">
        {
          blogs.map((blog)=>{
            return <Blog key={blog._id} blog={blog}/>
          })
        }
     </div>
    </div>
  )
}

export default Blogs
