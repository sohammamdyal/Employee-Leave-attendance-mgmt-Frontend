import axios from "axios"

const API_URL = "https://employee-leave-attendance-mgmt-backend-7.onrender.com";

export const registerUser = async(data) => {
    const response = await axios.post(`${API_URL}/api/employee/register`, data, {
        headers:{
            "Content-Type" : "multipart/form-data",
        },
    });
    return response.data;
};

export const loginUser = async(data) => {
    const response = await axios.post(`${API_URL}/api/employee/login`, data);
    if(response.data.token){                                       
        localStorage.setItem("token", response.data.token);
    }
    return response.data;                                                      
}

export const getProfile = async() => {
    const token = localStorage.getItem("token");

    const response = await axios.get(`${API_URL}/api/employee/profile`, {
        headers : {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const logout = () => {
    localStorage.removeItem("token");
};