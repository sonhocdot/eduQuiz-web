import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axios';

export default function Register() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); setMessage(''); setLoading(true);
        try {
            const response = await axiosClient.post('/register', formData);
            if (response.data.success) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                navigate('/dashboard');
            }
        } catch (error) {
            if (error.response?.status === 422) setErrors(error.response.data.errors);
            else setMessage('Đăng ký thất bại. Vui lòng kiểm tra lại đường truyền.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                
                {/* Bên trái: Banner thương hiệu (Giữ nguyên giống Login để đồng bộ) */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative">
                    <div className="space-y-2">
                        <div className="text-2xl font-black tracking-wider">EDUQUIZ.</div>
                        <p className="text-indigo-200 text-sm">Hệ thống khảo thí và luyện thi trực tuyến thông minh.</p>
                    </div>
                    <div className="space-y-4">
                        <h1 className="text-3xl font-bold leading-tight">Nâng tầm tri thức, chinh phục thử thách.</h1>
                        <p className="text-sm text-indigo-100/80">Trải nghiệm phòng thi ảo với tính năng chống gian lận và thống kê điểm số thời gian thực.</p>
                    </div>
                    <div className="text-xs text-indigo-200/50">© 2026 EduQuiz. All rights reserved.</div>
                    
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Bên phải: Form đăng ký */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">Tạo tài khoản mới</h2>
                        <p className="text-gray-400 text-sm mt-1">Trở thành học viên để tham gia các kỳ thi trắc nghiệm.</p>
                    </div>

                    {message && (
                        <div className="mb-4 p-3.5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-medium">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        {/* Họ và tên */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Họ và tên</label>
                            <input
                                type="text" name="name" value={formData.name} onChange={handleChange}
                                className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                placeholder="Nguyễn Văn A"
                                required
                            />
                            {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name[0]}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ Email</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                placeholder="name@example.com"
                                required
                            />
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email[0]}</p>}
                        </div>

                        {/* Mật khẩu & Xác nhận mật khẩu xếp hàng ngang trên màn hình lớn */}
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Mật khẩu</label>
                                <input
                                    type="password" name="password" value={formData.password} onChange={handleChange}
                                    className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                                {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password[0]}</p>}
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Xác nhận mật khẩu</label>
                                <input
                                    type="password" name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
                                    className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 active:scale-[0.98] shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
                        >
                            {loading ? 'Đang khởi tạo tài khoản...' : 'Kích Hoạt Tài Khoản Học Viên'}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-gray-100 text-center text-sm text-gray-500">
                        Đã có tài khoản rồi?{' '}
                        <span onClick={() => navigate('/login')} className="text-indigo-600 font-bold hover:underline cursor-pointer">
                            Đăng nhập ngay
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}