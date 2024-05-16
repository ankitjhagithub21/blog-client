import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
const Login = () => {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = {

            email,
            password
        }

        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                toast.success(data.message)
                setEmail('')
                setPassword('')
                navigate("/")
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error("Network error!")
        }finally{
            setLoading(false)
        }

    }
    return (
       <section>
         <div className='container my-5'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className='mb-3'>Login to your account</h2>
                    <form onSubmit={handleSubmit}>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">
                                Your email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                id="email"
                                name='email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">
                                Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                id="password"
                                name='password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary">
                           {
                            loading ? <>
                             <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Loading...</span> 
                            </> : 'Login'
                           }
                        </button>
                        <p className='mt-3'>Don't have an account ? <Link to={"/register"} className='underline text-primary'>Register Here</Link></p>
                    </form>

                </div>
            </div>
        </div>
       </section>
    )
}

export default Login
