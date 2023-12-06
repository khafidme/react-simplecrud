//Import useState from react
import { useState } from "react";

//Import useNavigate from react router dom
import { useNavigate } from "react-router-dom";

//Import API configuration
import api from "../../api";

const PostCreate = () => {

    //Set initial state for image, title and content
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //Set initial state for error messages
    const [errors, setErrors] = useState([]);

    //Set useNavigate
    const navigate = useNavigate();

    //Method to handle file changes
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //Method to handle add or create post
    const storePost = async (e) => {
        e.preventDefault();

        //Set initial FromData
        const formData = new FormData();

        //Set append of each dataform
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);

        //Send data via API
        await api.post('/api/posts', formData)
            
        //Redirect to posts index page
        .then(() => { navigate('/posts'); })

        //Set errors response to errors state
        .catch(error => { setErrors(error.response.data); })
    }

    return (
        <div className="container mt-3">
            <div className="row">
                <div className="col-md-12">
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <form onSubmit={storePost}>
                            
                                <div className="mb-3">
                                    <label className="form-label fw-bold">Image</label>
                                    <input type="file" onChange={handleFileChange} className="form-control"/>
                                    {
                                        errors.image && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.image[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Title</label>
                                    <input type="text" className="form-control" onChange={(e) => setTitle(e.target.value)} placeholder="Title Post"/>
                                    {
                                        errors.title && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.title[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <div className="mb-3">
                                    <label className="form-label fw-bold">Content</label>
                                    <textarea className="form-control" onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Content Post"></textarea>
                                    {
                                        errors.content && (
                                            <div className="alert alert-danger mt-2">
                                                {errors.content[0]}
                                            </div>
                                        )
                                    }
                                </div>

                                <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Save</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostCreate