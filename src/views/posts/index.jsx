//Import useState and useEffect from react
import { useState, useEffect } from "react";

//Import API configuration
import api from "../../api";

//Import Link from react router dom
import { Link } from "react-router-dom";

const PostIndex = () => {
    //Set initial state Post
    const [posts, setPosts] = useState([]);

    //Define fetch data post method
    const fetchDataPosts = async () => {

        //Get post data via API with axios
        await api.get('/api/posts')
        
        .then(response => {
            //Assign response data to state "posts"
            setPosts(response.data.data.data)
        })
    }

    //Run useEffect hooks
    useEffect(() => {

        //Call fetchDataPosts method
        fetchDataPosts();
    }, []);

    //Method to delete post
    const deletePost = async (id) => {
        await api.delete(`/api/posts/${id}`)
            .then(() => {

                //Call fetchDataPosts method
                fetchDataPosts();
            })
    }

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-md-12">
                    
                    {/** Add new post button */}
                    <Link to="/posts/create" className="mb-3 btn btn-success rounded shadow border-0">Add New</Link>
                    <div className="card border-0 rounded shadow">
                        <div className="card-body">
                            <table className="table">
                                <thead className="text-center bg-dark text-white">
                                    <tr>
                                        <th scope="col">Image</th>
                                        <th scope="col">Title</th>
                                        <th scope="col">Content</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        /** Check post data, if data exists then show all */
                                        posts.length > 0
                                            ? posts.map((post, index) => (
                                                <tr key={index}>
                                                    <td className="text-center"><img src={post.image} alt={post.title} width={100} /></td>
                                                    <td>{post.title}</td>
                                                    <td>{post.content}</td>
                                                    <td className="text-center">
                                                        <Link to={`/posts/edit/${post.id}`} className="btn btn-sm btn-primary shadow border-o m-2">Edit</Link>
                                                        <button onClick={() => deletePost(post.id)} className="btn btn-sm btn-danger shadow border-0">Delete</button>
                                                    </td>
                                                </tr>
                                            ))
                                            /** If data is empty then show the message */
                                            : <tr>
                                                <td colSpan="4" className="text-center">
                                                    <div className="alert alert-danger mb-0">Data belum tersedia</div>
                                                </td>
                                            </tr>
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostIndex