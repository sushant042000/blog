import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1"; ; 

export const userApi = {
  register: async(userData) => {
    
    return await axios.post(`${API_BASE_URL}/register`, userData);
  },
  login:async(loginData)=>{
    return await axios.post(`${API_BASE_URL}/login`,loginData);
  }
};
