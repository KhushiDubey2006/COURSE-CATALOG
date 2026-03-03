import axios from "axios";

const api = axios.create({
    // baseURL: "http://localhost:3000",
     baseURL:'https://course-catalog-system-8wfy.onrender.com'
});

export default api
