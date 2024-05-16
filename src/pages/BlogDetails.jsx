import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { convertDate } from '../helpers/convertDate';
import toast from "react-hot-toast";
import Loader from '../components/Loader';
import {FaPen, FaTrash} from "react-icons/fa"

const BlogDetails = ({ getUserFromServer }) => {
    const [blog, setBlog] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const user = useSelector(state => state.auth.user);
    const [comment, setComment] = useState('')
    const [comments, setComments] = useState([])
    const { id } = useParams();

    const getBlog = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
            const data = await res.json();
            if (data.success) {
                setBlog(data.blog);
                setComments(data.blog.comments)
            } else {
                toast.error("Failed to fetch blog.");
            }
        } catch (error) {
            console.error(error.message);
            toast.error("An error occurred while fetching the blog.");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
                method: "DELETE",
                credentials: 'include',
            });
            const data = await res.json();
            if (data.success) {
                toast.success(data.message);

                navigate("/");
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error("Something went wrong.");
            console.error(error.message);
        }
    };

    const addComment = async () => {
        if (!user) {
            return toast.error("You are not logged In.")
        }
        if (comment.length <= 0) {
            return toast.error("Can not add empty comment.")
        }
        const formData = {
            content: comment,
            blogId: id
        }
        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comments/add`, {
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
                setComments([...comments, data.comment])
                setComment('')
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error("Network error.")
            console.error(error.message)
        }
    }
    const deleteComment = async (commentId) => {


        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/comments/delete/${id}/${commentId}`, {
                method: "DELETE",
                credentials: 'include',

            })

            const data = await res.json()
            if (data.success) {
                toast.success(data.message)
                setComments(comments.filter((comment) => comment._id != commentId))
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error("Network error.")
            console.error(error.message)
        }
    }

    useEffect(() => {
        getBlog();
    }, [id]);

    useEffect(() => {
        if (!user) {
            getUserFromServer()
        }
    }, [])

    if (loading) {
        return <Loader />

    }

    if (!blog) {
        return <p>Blog not found.</p>;
    }

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className="col-md-10 mx-auto">
                    {
                        user && blog.user === user._id && (
                            <div className='d-flex gap-2 justify-content-end mb-5'>
                                <button className='btn btn-danger btn-sm' onClick={handleDelete}>
                                    <FaTrash/>
                                </button>
                                <button className='btn btn-info btn-sm' onClick={() => navigate(`/blogs/update/${id}`)}>
                                    <FaPen/>
                                </button>
                            </div>
                        )
                    }
                    <h2 className='fs-5 mb-3'><Link to={"/"}>Home</Link> / {blog.title}</h2>

                    <img src={`${import.meta.env.VITE_SERVER_URL}/${blog.image}`} alt="thumbnail" className='img-fluid' />

                    <div dangerouslySetInnerHTML={{ __html: blog.content }}></div>
                    
                    <div className='my-3 fs-5 d-flex justify-content-between align-items-center'>
                        <h5>Date - {convertDate(blog.createdAt)}</h5>
                        <h5>Author : {blog.user == user?._id ? "You" : blog.author}</h5>
                    </div>
                    <h2 className='fs-5 mb-3'>Comments</h2>
                    <div className='my-3'>
                        {
                            comments.length === 0 ? <p className='fs-5'>No comments yet.</p> : comments.map((comment) => {
                                return <div key={comment._id} className='bg-light  p-3 rounded my-4 comment'>
                                   
                                    <div className='d-flex align-items-center mb-2 justify-content-between'>
                                       <div className='d-flex gap-2 fw-bold text-primary'>
                                       <p>{comment.user.name}</p> <p>{convertDate(comment.createdAt)}</p>
                                       </div>
                                         
                                        {
                                            comment.user.userId == user._id &&
                                                <FaTrash color='#BB2D3B' onClick={() => deleteComment(comment._id)}/>
                                            
                                        }
                                    </div>

                                    <p className='border p-2 rounded'>{comment.content}</p>

                                </div>
                            })
                        }
                    </div>

                    <div className='d-flex flex-column'>




                        <textarea
                            className="form-control mb-3"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            rows={5}
                        />
                        <button className='btn btn-primary' onClick={addComment}>Add Comment</button>



                    </div>


                </div>

            </div>

        </div >
    );
};

export default BlogDetails;
