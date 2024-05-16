import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import JoditEditor from 'jodit-react';
import toast from 'react-hot-toast';

const UpdateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const editor = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`);
                const data = await res.json();
                
                if (data.success) {
                    setTitle(data.blog.title);
                    setContent(data.blog.content);
                   
                   
                } else {
                    toast.error(data.message);
                }
            } catch (error) {
                console.error(error.message);
                toast.error("Network error!");
            }
        };

        fetchBlog();
    }, [id]);

  

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData  ={
            title,
            content
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/${id}`, {
                method: 'PUT',
                headers:{
                    "Content-Type":"application/json"
                },
                credentials: 'include',
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.error(error.message);
            toast.error("Network error!");
        }
    };

    return (
        <div className='container my-5'>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <h2 className='mb-3 text-center'>Update Blog</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="title" className="form-label">Blog Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
                        </div>
                        
                        <button type="submit" className="btn btn-primary">Update</button>

                    </form>
                </div>
            </div>
        </div>
    );
};

export default UpdateBlog;
