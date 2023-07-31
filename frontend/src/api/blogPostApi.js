import axios from "axios";
const API_BASE_URL = "http://localhost:4000/api/v1/post";

export const blogApi = {
  create: async (blogData) => {
    
    return await axios.post(`${API_BASE_URL}/create`, blogData);
  },

  getAllPosts:async()=>{
    
    return await axios.get(`${API_BASE_URL}/all`)
  },
  getMyPost:async()=>{
     return await axios.get(`${API_BASE_URL}/myPost`);
  }
};
