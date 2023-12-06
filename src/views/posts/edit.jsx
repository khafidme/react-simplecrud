//Import useState and useEffect from react
import { useState, useEffect } from "react";

//Import useNavigate and useParams from react router dom
import { useNavigate, useParams } from "react-router-dom";

//Import API configuration
import api from "../../api";

const PostEdit = () => {

    //Set initial state for image, title and content
    const [image, setImage] = useState('');
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    //Set initial state for error messages
    const [errors, setErrors] = useState([]);

    //Set useNavigate
    const navigate = useNavigate();

    //Destruct ID
    const { id } = useParams();

    //Define fetch data post method
    const fetchDetailPost = async () => {

        //Get post data based ID via API with axios
        await api.get(`/api/posts/${id}`)

        .then(response => {
            //Assign response data to title and content states
            setTitle(response.data.data.title);
            setContent(response.data.data.content);
        })
    }

    //Run useEffect hooks
    useEffect(() => {
        
        //Call fetchDataPosts method
        fetchDetailPost();

    }, []);

    //Method to handle file changes
    const handleFileChange = (e) => {
        setImage(e.target.files[0]);
    }

    //Method to handle update post
    const updatePost = async (e) => {
        e.preventDefault();

        //Set initial FromData
        const formData = new FormData();

        //Set append of each dataform
        formData.append('image', image);
        formData.append('title', title);
        formData.append('content', content);
        formData.append('_method', 'PUT');

        //Send data via API
        await api.post(`/api/posts/${id}`, formData)
            
            //Redirect to posts index page
            .then(() => { navigate('/posts') })

            //Set errors response to errors state
            .catch(error => { setErrors(error.response.data); })
    }
    
    return (
        <>
            <div className="container mt-5 mb-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card border-0 rounded shadow">
                            <div className="card-body">
                                <form onSubmit={updatePost}>
                                    
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
                                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title Post"/>
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
                                        <textarea className="form-control" value={content} onChange={(e) => setContent(e.target.value)} rows="5" placeholder="Content Post"></textarea>
                                        {
                                            errors.content && (
                                                <div className="alert alert-danger mt-2">
                                                    {errors.content[0]}
                                                </div>
                                            )
                                        }
                                    </div>

                                    <button type="submit" className="btn btn-md btn-primary rounded-sm shadow border-0">Update</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default PostEdit