import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axios';

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
        try { 
            await axiosClient.post('/logout'); 
        } catch (e) { 
            // Nếu lỗi token hoặc hết hạn vẫn xử lý xóa localStorage dưới client
            console.error(e); 
        } finally {
            localStorage.clear();
            navigate('/login');
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50 font-semibold text-gray-500">
                Đang xác thực thông tin tài khoản...
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50/60 flex flex-col text-gray-800">
            {/* Thanh thanh thanh điều hướng trên cùng (Header) */}
            <header className="bg-white border-b border-gray-100 shadow-sm sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center text-white font-black text-lg shadow-md shadow-indigo-100">
                            E
                        </div>
                        <span className="font-black text-xl bg-gradient-to-r from-indigo-600 to-purple-700 bg-clip-text text-transparent tracking-tight">
                            EduQuiz
                        </span>
                    </div>
                    
                    <div className="flex items-center space-x-4">
                        <span className="text-[11px] bg-indigo-50 text-indigo-700 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider border border-indigo-100">
                            {user.role}
                        </span>
                        <div className="text-right hidden sm:block">
                            <div className="text-sm font-bold text-gray-800">{user.name}</div>
                            <div className="text-xs text-gray-400">{user.email}</div>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="bg-gray-100 hover:bg-rose-50 hover:text-rose-600 text-gray-600 text-xs font-bold px-4 py-2.5 rounded-xl transition-all"
                        >
                            Đăng xuất
                        </button>
                    </div>
                </div>
            </header>

            {/* Bố cục chính của Dashboard (Main Layout) */}
            <div className="max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 my-8 grid gap-6 md:grid-cols-4 flex-1">
                
                {/* Cột trái: Thông tin cá nhân */}
                <aside className="md:col-span-1 space-y-4">
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 text-center">
                        <div className="w-20 h-20 bg-gradient-to-tr from-indigo-500 via-indigo-600 to-purple-600 text-white rounded-full mx-auto flex items-center justify-center text-3xl font-bold shadow-lg shadow-indigo-100">
                            {user.name.charAt(0)}
                        </div>
                        <h3 className="text-lg font-bold text-gray-800 mt-4">{user.name}</h3>
                        <p className="text-xs text-gray-400 mt-1">Mã tài khoản: #{user.id}</p>
                        
                        <div className="mt-6 pt-6 border-t border-gray-50 text-left space-y-2.5 text-sm">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Trạng thái:</span>
                                <span className="text-emerald-600 font-semibold flex items-center">
                                    <span className="w-2 h-2 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span>
                                    Hoạt động
                                </span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Cột phải: Thống kê & Hoạt động chính */}
                <main className="md:col-span-3 space-y-6">
                    
                    {/* Hộp Chào mừng độc quyền */}
                    <div className="p-6 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden">
                        <div className="relative z-10">
                            <h2 className="text-xl font-bold">Xin chào, {user.name}! 👋</h2>
                            <p className="text-indigo-100 text-sm mt-1 max-w-xl">
                                Chào mừng bạn quay trở lại với EduQuiz. Hôm nay bạn muốn tham gia phòng luyện đề trắc nghiệm hay làm bài thi chính thức?
                            </p>
                        </div>
                        <div className="absolute -right-6 -bottom-6 text-8xl opacity-10 font-bold select-none">QUIZ</div>
                    </div>

                    {/* Ba thẻ thông số (Metrics) */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-xl">📝</div>
                            <div>
                                <div className="text-2xl font-black text-gray-800">0</div>
                                <div className="text-xs text-gray-400 font-medium">Bài thi đã làm</div>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center text-xl">🎯</div>
                            <div>
                                <div className="text-2xl font-black text-gray-800">0.0</div>
                                <div className="text-xs text-gray-400 font-medium">Điểm trung bình</div>
                            </div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-4">
                            <div className="w-12 h-12 bg-pink-50 rounded-xl flex items-center justify-center text-xl">⏳</div>
                            <div>
                                <div className="text-2xl font-black text-gray-800">0m</div>
                                <div className="text-xs text-gray-400 font-medium">Thời gian thi</div>
                            </div>
                        </div>
                    </div>

                    {/* Danh sách phòng thi trống rỗng khi mới đăng nhập */}
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                            <h3 className="font-bold text-gray-800">Lịch sử làm bài gần đây</h3>
                            <span className="text-xs text-gray-400">Dữ liệu thời gian thực</span>
                        </div>
                        <div className="p-12 text-center text-sm text-gray-400 flex flex-col items-center justify-center space-y-2">
                            <div className="text-3xl">📁</div>
                            <p className="font-medium">Bạn chưa thực hiện bài thi trắc nghiệm nào.</p>
                            <p className="text-xs text-gray-400/80">Hãy nhập mã phòng thi do giảng viên cung cấp để bắt đầu.</p>
                        </div>
                    </div>

                </main>
            </div>
        </div>
    );
}