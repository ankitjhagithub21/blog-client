import React from 'react';
import { Link } from 'react-router-dom';

const Blog = ({ blog }) => {
    

    return (
        <div className="col-lg-4 col-md-6 my-3">
            <div className="card">
                <img src={blog.image} className="card-img-top" alt="Blog Thumbnail"/>
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
