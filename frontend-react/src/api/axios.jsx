import axios from 'axios';

const axiosClient = axios.create({
    baseURL: 'http://127.0.0.1:8000/api', // Thay bằng URL API Laravel của bạn
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});

// Tự động thêm Token vào Header nếu có
axiosClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

export default axiosClient;