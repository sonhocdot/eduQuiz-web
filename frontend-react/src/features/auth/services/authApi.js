import axiosClient from '@/services/axios';

export const authApi = {
    login: (data) => axiosClient.post('/login', data),
    register: (data) => axiosClient.post('/register', data),
    logout: () => axiosClient.post('/logout'),
};