import React, { useState, useEffect } from 'react';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { authApi } from '@/features/auth';

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        if (!localUser) {
            navigate('/login');
            return;
        }
        const parsedUser = JSON.parse(localUser);
        if (parsedUser.role !== 'admin' && parsedUser.role !== 'backoffice') {
            navigate('/dashboard');
        } else {
            setAdmin(parsedUser);
        }
    }, [navigate]);

    const handleLogout = async () => {
        try { await authApi.logout(); } catch (e) { console.error(e); }
        localStorage.clear();
        navigate('/login');
    };

    const menuItems = [
        { path: '/admin/dashboard', name: 'Tổng quan', icon: '📊' },
        { path: '/admin/subjects', name: 'Quản lý Môn học', icon: '📚' },
        { path: '/admin/quizzes', name: 'Quản lý Đề thi', icon: '📝' },
        { path: '/admin/questions', name: 'Ngân hàng Câu hỏi', icon: '🗂️' },
        { path: '/admin/users', name: 'Quản lý Học viên', icon: '🎓' },
        { path: '/admin/teachers', name: 'Hội đồng Giảng viên', icon: '👨‍🏫' },
    ];

    if (!admin) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100 text-gray-500 font-medium">
                Đang xác thực quyền quản trị...
            </div>
        );
    }

    return (
        // Sử dụng w-full bao bọc ngoài cùng
        <div className="w-full min-h-screen bg-gray-100 flex flex-col md:flex-row text-gray-800 antialiased">
            {/* THANH MENU SIDEBAR BÊN TRÁI */}
            <aside className="w-full md:w-64 bg-slate-950 text-slate-300 flex flex-col shadow-xl shrink-0">
                <div className="h-16 px-6 flex items-center space-x-3 bg-slate-900 border-b border-slate-800">
                    <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-black text-sm shadow-md">
                        EQ
                    </div>
                    <div className="flex flex-col">
                        <span className="font-black text-base text-white tracking-wider leading-none">EDUQUIZ</span>
                        <span className="text-[10px] text-indigo-400 font-bold uppercase tracking-widest mt-1">Management</span>
                    </div>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    {menuItems.map((item) => {
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

                <div className="p-4 bg-slate-900 border-t border-slate-800">
                    <div className="flex items-center space-x-3 overflow-hidden">
                        <div className="w-9 h-9 bg-gradient-to-tr from-slate-700 to-slate-600 text-white font-bold rounded-xl flex items-center justify-center shrink-0 shadow-sm border border-slate-700">
                            {admin.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="truncate">
                            <div className="text-sm font-bold text-white truncate">{admin.name}</div>
                            <div className="text-xs text-slate-500 truncate">Quản trị viên</div>
                        </div>
                    </div>
                </div>
            </aside>

            {/* 🌟 PHẦN NỘI DUNG CHÍNH BÊN PHẢI (Đã thêm w-full và min-w-0 để triệt tiêu lỗi bóp chiều rộng) */}
            <div className="flex-1 flex flex-col min-w-0 w-full">
                {/* HEADER TRÊN CÙNG */}
                <header className="h-16 bg-white border-b border-gray-200 px-6 flex items-center justify-between sticky top-0 z-40 shadow-sm w-full">
                    <div className="text-sm font-bold text-slate-700">
                        Hệ thống Quản lý Khảo thí & Ngân hàng câu hỏi
                    </div>
                    <button 
                        onClick={handleLogout} 
                        className="text-xs font-bold text-gray-500 hover:text-rose-600 bg-gray-100 hover:bg-rose-50 px-4 py-2.5 rounded-xl transition-all"
                    >
                        Đăng xuất 🚪
                    </button>
                </header>

                {/* VÙNG NỘI DUNG THAY ĐỔI (Đã thêm w-full giúp các trang con tràn đều sang hai bên lề) */}
                <main className="p-6 md:p-8 flex-1 w-full overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    );
}