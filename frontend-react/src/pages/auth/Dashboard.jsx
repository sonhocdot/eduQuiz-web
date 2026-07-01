import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/features/auth';

export default function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const localUser = localStorage.getItem('user');
        if (!localUser) {
            navigate('/login');
        } else {
            setUser(JSON.parse(localUser));
        }
    }, [navigate]);

    const handleLogout = async () => {
        try { await authApi.logout(); } catch (e) { console.error(e); }
        localStorage.clear();
        navigate('/login');
    };

    if (!user) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Đang xác thực...</div>;

    return (
        <div className="min-h-screen bg-gray-50/60 flex flex-col text-gray-800">
            {/* Header */}
            <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg">E</div>
                        <span className="font-black text-xl bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent">EduQuiz</span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border border-indigo-100">{user.role}</span>
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-gray-800">{user.name}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                        <button onClick={handleLogout} className="bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all">Đăng xuất</button>
                    </div>
                </div>
            </header>

            {/* Content Layout */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-8 grid gap-6 md:grid-cols-4 flex-1">
                <aside className="md:col-span-1">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 to-purple-600 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold shadow-lg">{user.name.charAt(0)}</div>
                        <h3 className="text-lg font-bold text-gray-800 mt-4">{user.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">ID: #{user.id}</p>
                    </div>
                </aside>

                <main className="md:col-span-3 space-y-6">
                    <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl">
                        <h2 className="text-xl font-bold">Xin chào, {user.name}! 👋</h2>
                        <p className="text-indigo-100 text-sm mt-1">Chào mừng bạn đến với hệ thống thi trắc nghiệm EduQuiz.</p>
                    </div>

                    {/* Sau này, khi có thêm tính năng làm bài, bạn chỉ cần nạp các component từ features/quiz vào vị trí này */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center text-sm text-gray-400">
                        📁 Chưa có dữ liệu bài thi được kích hoạt.
                    </div>
                </main>
            </div>
        </div>
    );
}