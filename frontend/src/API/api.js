import axios from "axios";

const API_BASE_URL = "http://localhost:4000/api/v1";

export const userApi = {
  //register new user
  register: async (userData) => {
    return await axios.post(`${API_BASE_URL}/register`, userData);
  },

  login: async (loginData) => {
    return await axios.post(`${API_BASE_URL}/login`, loginData);
  },
  logout: async () => {
    return await axios.get(`${API_BASE_URL}/logout`);
  },
  getMyProfile: async () => {
    return await axios.get(`${API_BASE_URL}/myProfile`);
  },
  updateMyProfile: async (dataToUpdate) => {
    return await axios.put(`${API_BASE_URL}/updateProfile`, dataToUpdate);
  },
};
