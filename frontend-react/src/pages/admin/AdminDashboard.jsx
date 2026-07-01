import React, { useState, useEffect } from 'react';
import { adminApi } from '@/features/admin';

export default function AdminDashboard() {
    // 1. Trạng thái lưu số liệu quản trị hệ thống
    const [systemStats, setSystemStats] = useState({
        total_teachers: 0,
        total_students: 0,
        total_subjects: 0,
        total_questions: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadAdminDashboardData = async () => {
            try {
                // Gọi cây danh mục để tính toán số môn học thực tế từ DB
                const res = await adminApi.getCategoryTree();
                
                // MOCK DATA CẤP CAO của Admin (Khi bạn viết thêm API Dashboard tổng ở Backend thì nạp vào đây)
                setSystemStats({
                    total_teachers: 8,                                // Thống kê số lượng giáo viên
                    total_students: 142,                              // Thống kê số lượng học viên toàn trường
                    total_subjects: res.data?.data?.length || 4,      // Đếm số môn học lấy từ Database thực tế
                    total_questions: 520                               // Tổng số câu hỏi nằm trong ngân hàng đề
                });
            } catch (err) {
                console.error("Lỗi nạp số liệu admin:", err);
            } finally {
                setLoading(false);
            }
        };

        loadAdminDashboardData();
    }, []);

    if (loading) return <div className="text-center py-12 text-gray-400 font-medium">Đang thống kê số liệu hệ thống...</div>;

    return (
        <div className="space-y-8">
            {/* Chào mừng Admin */}
            <div>
                <h1 className="text-2xl font-black text-gray-800 tracking-tight">Bảng Điều Khiển Quản Trị</h1>
                <p className="text-gray-500 text-sm mt-0.5">Chào mừng trở lại! Dưới đây là hiệu suất và chỉ số vận hành tổng thể của hệ thống EduQuiz.</p>
            </div>

            {/* 4 Thẻ thống kê dành riêng cho cấp Quản Trị (Admin / Teacher) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                
                {/* Thẻ 1: Quản lý Giảng viên */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-indigo-500 transition-all">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Hội đồng Giảng viên</span>
                        <div className="text-3xl font-black text-gray-800">{systemStats.total_teachers}</div>
                        <p className="text-xs text-indigo-600 font-medium">Tài khoản nhân sự</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center text-xl font-bold">
                        👨‍🏫
                    </div>
                </div>

                {/* Thẻ 2: Quản lý Học viên */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-emerald-500 transition-all">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Tổng số Học viên</span>
                        <div className="text-3xl font-black text-gray-800">{systemStats.total_students}</div>
                        <p className="text-xs text-emerald-600 font-medium">Đang được cấp quyền</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl font-bold">
                        🎓
                    </div>
                </div>

                {/* Thẻ 3: Quản lý Môn học */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-amber-500 transition-all">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Môn học kích hoạt</span>
                        <div className="text-3xl font-black text-gray-800">{systemStats.total_subjects}</div>
                        <p className="text-xs text-amber-600 font-medium">Có trên hệ thống</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl font-bold">
                        📚
                    </div>
                </div>

                {/* Thẻ 4: Ngân hàng câu hỏi */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between group hover:border-rose-500 transition-all">
                    <div className="space-y-1">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Kho dữ liệu câu hỏi</span>
                        <div className="text-3xl font-black text-gray-800">{systemStats.total_questions}</div>
                        <p className="text-xs text-rose-600 font-medium">Câu hỏi trắc nghiệm</p>
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center text-xl font-bold">
                        🗂️
                    </div>
                </div>
            </div>

            {/* Bảng Nhật ký Giám sát thi cử & Hành động nhanh của Admin */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Nhật ký giám sát (Bên trái) */}
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
                    <div className="border-b border-gray-100 pb-4 flex items-center justify-between">
                        <h3 className="font-bold text-gray-800 text-base">Hoạt động thi cử & Kiểm tra toàn trường</h3>
                        <span className="text-xs bg-red-50 text-red-600 px-2.5 py-1 rounded-full font-bold animate-pulse">● Live Monitoring</span>
                    </div>
                    <div className="divide-y divide-gray-50 text-sm">
                        <div className="py-3.5 flex justify-between items-center">
                            <div>
                                <span className="font-bold text-gray-800">Nguyễn Văn A</span>
                                <span className="text-gray-500 text-xs"> vừa nộp bài thi môn </span>
                                <span className="font-semibold text-indigo-600">Toán Cao Cấp 1</span>
                            </div>
                            <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg">8.5 Điểm</span>
                        </div>
                        <div className="py-3.5 flex justify-between items-center">
                            <div>
                                <span className="font-bold text-gray-800">Trần Thị B</span>
                                <span className="text-gray-500 text-xs"> vừa tham gia luyện tập chương </span>
                                <span className="font-semibold text-amber-600">Cấu trúc dữ liệu</span>
                            </div>
                            <span className="text-xs text-gray-400">2 phút trước</span>
                        </div>
                    </div>
                </div>

                {/* Bảng thao tác nhanh quyền lực của Admin (Bên phải) */}
                <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                    <div className="border-b border-gray-100 pb-4">
                        <h3 className="font-bold text-gray-800 text-base">Lối tắt nghiệp vụ nhanh</h3>
                    </div>
                    <div className="space-y-3 py-4 flex-1 flex flex-col justify-center">
                        <button className="w-full text-left p-3.5 rounded-xl bg-gray-50 hover:bg-indigo-50 hover:text-indigo-600 text-xs font-bold border border-gray-100 text-gray-600 transition-all flex items-center justify-between">
                            <span>➕ Cấp tài khoản Giảng Viên mới</span>
                            <span>➔</span>
                        </button>
                        <button className="w-full text-left p-3.5 rounded-xl bg-gray-50 hover:bg-emerald-50 hover:text-emerald-600 text-xs font-bold border border-gray-100 text-gray-600 transition-all flex items-center justify-between">
                            <span>📚 Thêm Môn học / Học phần mới</span>
                            <span>➔</span>
                        </button>
                        <button className="w-full text-left p-3.5 rounded-xl bg-gray-50 hover:bg-rose-50 hover:text-rose-600 text-xs font-bold border border-gray-100 text-gray-600 transition-all flex items-center justify-between">
                            <span>🔒 Xem danh sách Học viên bị khóa</span>
                            <span>➔</span>
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}