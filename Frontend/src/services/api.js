
import axios from "axios";

const Api =  axios.create({
    baseURL:'http://localhost:4000/api',
    headers:{
      
        "Content-Type":"application/json",
        "Accept":"application/json"
    }
});

Api.interceptors.request.use((config) => {
    const token = sessionStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`; 
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

const stores = (token, user)=>{
    sessionStorage.setItem("token", token);
    sessionStorage.setItem("users", JSON.stringify(user));
}

const RemoveSesstionStorage =()=>{
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("users");
}

export {Api, stores, RemoveSesstionStorage};