import React from 'react';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes'; // Import biến router từ file routes.jsx của bạn

function App() {
    // Chỉ cần cắm RouterProvider vào đây, xóa bỏ hoàn toàn <Router>, <Routes>, <Route> cũ
    return <RouterProvider router={router} />;
}

export default App;

