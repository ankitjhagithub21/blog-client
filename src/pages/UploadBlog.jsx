import React, { useRef, useState } from 'react';
import JoditEditor from 'jodit-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';

const UploadBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [loading,setLoading] = useState(false)
    const editor = useRef(null);
    const navigate = useNavigate();
    const user = useSelector(state=>state.auth.user)

    const handleSubmit = async (e) => {
        e.preventDefault();

        if(!user){
            return toast.error("You are not logged In.")
        }
        const formData = new FormData();
        formData.append('title', title);
        formData.append('content', content);
        formData.append('image', image);

        try {
            setLoading(true)
            const res = await fetch(`${import.meta.env.VITE_SERVER_URL}/api/blogs/upload`, {
                method: 'POST',
               
                credentials: 'include',
                body: formData,
            });

            const data = await res.json();

            if (data.success) {
                toast.success(data.message);
                setTitle('');
                setContent('');
                setImage(null); // Clear the file input
                navigate('/');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            console.log(error.message);
            toast.error('Network error!');
        }finally{
            setLoading(false)
        }
    };

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-md-8 mx-auto'>
                    <h2 className='mb-3 text-center'>Upload Blog</h2>
                    <form onSubmit={handleSubmit} encType='multipart/form-data'>
                        <div className='mb-3'>
                            <label htmlFor='title' className='form-label'>
                                Blog Title
                            </label>
                            <input
                                type='text'
                                className='form-control'
                                id='title'
                                name='title'
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                required
                            />
                        </div>
                        <div className='mb-3'>
                            <JoditEditor ref={editor} value={content} onChange={(newContent) => setContent(newContent)} />
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='image' className='form-label'>
                                Blog Thumbnail
                            </label>
                            <input
                                type='file'
                                className='form-control'
                                onChange={(e) => setImage(e.target.files[0])}
                                required
                            />
                        </div>
                        <button type='submit' className='btn btn-primary'>
                            {
                                loading ? <>
                                 <span className="spinner-border spinner-border-sm" aria-hidden="true"></span>
                            <span role="status">Uploading...</span>
                                </> : 'Upload'
                            }
                            </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UploadBlog;
