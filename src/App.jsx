import React from 'react'
import "./App.css"
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import {Toaster} from "react-hot-toast"
import Navbar from './components/Navbar'
import Blogs from './pages/Blogs'
import UploadBlog from './pages/UploadBlog'
import BlogDetails from './pages/BlogDetails'
import UpdateBlog from './pages/UpdateBlog'
import { useDispatch } from 'react-redux'
import { setUser } from './app/slices/authSlice'
const App = () => {
  const dispatch = useDispatch()
  const getUserFromServer = async() =>{
    try{
      const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/user`,{
        credentials:'include'
      })
      const data = await res.json()
      if(data.success){
        dispatch(setUser(data.user))
      }else{
        dispatch(setUser(null))
      }
    }catch(error){
        console.error(error.message)
    }
}
  return (
    <BrowserRouter>

    <Toaster/>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home getUserFromServer={getUserFromServer}/>}/>
      <Route path="/upload" element={<UploadBlog/>}/>
      <Route path="/blogs/update/:id" element={<UpdateBlog/>}/>
      <Route path="/blogs/:id" element={<BlogDetails getUserFromServer={getUserFromServer}/>}/>
      <Route path="/blogs" element={<Blogs/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
