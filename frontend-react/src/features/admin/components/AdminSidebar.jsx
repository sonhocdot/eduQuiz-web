import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function AdminSidebar({ adminInfo }) {
    const navigate = useNavigate();
    const location = useLocation();

    // Khai báo danh sách các Menu điều hướng
    const menuItems = [
        { path: '/admin/dashboard', name: 'Tổng quan', icon: '📊' },
        { path: '/admin/subjects', name: 'Quản lý Cây môn học', icon: '📚' },
        { path: '/admin/users', name: 'Quản lý Học viên', icon: '🎓' },
        { path: '/admin/teachers', name: 'Hội đồng Giảng viên', icon: '👨‍🏫' },
        { path: '/admin/quizzes', name: 'Quản lý Đề thi', icon: '📝' },
        { path: '/admin/questions', name: 'Ngân hàng Câu hỏi', icon: '🗂️' },
    ];

    return (
        <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col shadow-xl shrink-0">
            {/* 1. Phần Header Logo của Sidebar */}
            <div className="h-16 px-6 flex items-center space-x-3 bg-slate-950 border-b border-slate-800">
                <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">
                    EQ
                </div>
                <div className="flex flex-col">
                    <span className="font-black text-base text-white tracking-wider leading-none">EDUQUIZ</span>
                    <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Management</span>
                </div>
            </div>

            {/* 2. Phần Danh sách Menu tính năng */}
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menuItems.map((item) => {
                    // Kiểm tra xem Route hiện tại có trùng với item này không để bật Highlight
                    const isActive = location.pathname === item.path;
                    
                    return (
                        <button
                            key={item.path}
                            onClick={() => navigate(item.path)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all duration-200 ${
                                isActive 
                                    ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20' 
                                    : 'hover:bg-slate-800 hover:text-slate-100 text-slate-400'
                            }`}
                        >
                            <span className="text-base">{item.icon}</span>
                            <span>{item.name}</span>
                        </button>
                    );
                })}
            </nav>

            {/* 3. Phần Footer hiển thị thông tin tài khoản đang đăng nhập */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between">
                <div className="flex items-center space-x-3 overflow-hidden">
                    {/* Avatar ký tự đầu của Admin */}
                    <div className="w-9 h-9 bg-gradient-to-tr from-slate-700 to-slate-600 text-white font-bold rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-700">
                        {adminInfo?.name?.charAt(0).toUpperCase() || 'A'}
                    </div>
                    {/* Tên và quyền hạn */}
                    <div className="truncate">
                        <div className="text-sm font-bold text-slate-200 truncate">
                            {adminInfo?.name || 'Chưa cập nhật'}
                        </div>
                        <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">
                            {adminInfo?.role === 'admin' ? '⚡ Admin Tổng' : '📖 Giảng Viên'}
                        </div>
                    </div>
                </div>
            </div>
        </aside>
    );
}