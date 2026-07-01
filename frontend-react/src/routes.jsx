import React from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Dashboard from './pages/auth/Dashboard';
import AdminLayout from './layouts/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminCategories from './pages/admin/AdminCategories';
import AdminStudents from './pages/admin/AdminStudents';
import AdminTeachers from './pages/admin/AdminTeachers';

// Bộ lọc bảo vệ Route: Chưa đăng nhập thì đá về /login
const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return token ? <>{children}</> : <Navigate to="/login" replace />;
};  

// Bộ lọc chặn đăng nhập lại: Đã đăng nhập rồi thì không cho quay lại trang Login/Register
const GuestRoute = ({ children }) => {
    const token = localStorage.getItem('access_token');
    return !token ? <>{children}</> : <Navigate to="/dashboard" replace />;
};
export const router = createBrowserRouter([
    { path: '/', element: <Navigate to="/login" replace /> },
    { path: '/login', element: <GuestRoute><Login /></GuestRoute> },
    { path: '/register', element: <GuestRoute><Register /></GuestRoute> },
    { path: '/dashboard', element: <ProtectedRoute><Dashboard /></ProtectedRoute> },
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            { path: 'dashboard', element: <AdminDashboard /> },
            { path: 'subjects', element: <AdminCategories /> }, // Trỏ vào trang Cây danh mục (Môn -> Chương)
            { path: 'quizzes', element: <div className="bg-white p-20 rounded-2xl border text-center text-gray-400">📝 Quản lý đề thi...</div> },
            { path: 'questions', element: <div className="bg-white p-20 rounded-2xl border text-center text-gray-400">🗂️ Quản lý ngân hàng câu hỏi...</div> },
            { path: 'users', element: <AdminStudents /> },     // Quản lý học viên thực tế từ DB
            { path: 'teachers', element: <AdminTeachers /> },   // Quản lý giảng viên thực tế từ DB
        ]
    },
    { path: '*', element: <div className="min-h-screen flex items-center justify-center font-bold text-gray-500">404 - Không tìm thấy trang</div> }
]);
