import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                
                {/* Mockup route cho trang quản trị */}
                <Route path="/admin/dashboard" element={
                    <div className="p-8 font-bold text-xl text-center">Chào mừng giáo viên/admin đến trang Quản trị (Backoffice)</div>
                } />

                {/* Tự động chuyển hướng nếu vào route không tồn tại */}
                <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
        </Router>
    );
}

export default App;
