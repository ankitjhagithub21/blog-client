import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { setUser } from '../app/slices/authSlice'
import toast from "react-hot-toast"
import { FaGithub, FaHome } from 'react-icons/fa'
const Navbar = () => {
    const user = useSelector((state)=>state.auth.user)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handleLogout = async() =>{
        const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/logout`,{
            credentials:'include'
        })
        const data = await res.json()
        if(data.success){
           dispatch(setUser(null))
           toast.success(data.message)
           navigate("/login")
        }
    }
    return (
        <nav className='container p-2 d-flex  align-items-center justify-content-between'>
            <div>
                <Link to={"/"} className='btn btn-primary'>
                    <FaHome size={20}/>
                </Link>
            </div>
            <div className='d-flex gap-2 align-items-center'>
               {
                user ? <>
                <Link className='btn btn-primary' to={"/upload"}>Upload Blog</Link>
                 <button className='btn btn-danger' onClick={handleLogout}>
                   Logout
                 </button>
                
                </> : <>
                <Link className='btn btn-primary' to={"/register"}>Register</Link>
                <Link className='btn btn-success' to={"/login"}>Login</Link>
                </>
               }
               <a href="https://github.com/ankitjhagithub21/blog-client" target='_blank' className='btn btn-dark'>
                <FaGithub size={23}/>
               </a>
            </div>
        </nav>

    )
}

export default Navbar
