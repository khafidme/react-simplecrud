//Import axios from axios library
import axios from "axios";

const Api = axios.create({
    //Set API URL
    baseURL: 'http://localhost:8000/'
})

export default Api;