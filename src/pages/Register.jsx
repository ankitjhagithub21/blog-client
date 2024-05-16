import React, { useState } from 'react'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast'
const Register = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (name.length < 3) {
            return toast.error("Name must be 3 characters long.")
        }
        if (password.length < 6) {
            return toast.error("Password length must be 6 characters long.")
        }

        const formData = {
            name,
            email,
            password
        }


        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(formData)
            })

            const data = await res.json()

            if (data.success) {
                toast.success(data.message)
                setName('')
                setEmail('')
                setPassword('')
                navigate("/login")
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error.message)
            toast.error("Network error!")
        } finally {
            setLoading(false)
        }

    }
    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-6 mx-auto">
                    <h2 className='mb-3'>Create an account</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">
                                Your name
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                name='name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />

                        </div>
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
                           
                            {loading ? <>
                                <span class="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Loading...</span>
                            </> : 'Register'}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default Register
