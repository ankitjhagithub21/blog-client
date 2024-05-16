import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    const imageUrl = `${import.meta.env.VITE_SERVER_URL}/${blog.image}`;

    return (
        <div className="col-lg-4 col-md-6 my-3">
            <div className="card">
                <img src={imageUrl} className="card-img-top" alt="Blog Thumbnail"/>
                <div className="card-body">
                    <h5 className="card-title">{blog.title}</h5>
                    <Link to={`/blogs/${blog._id}`}>
                        Read Blog
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Blog
