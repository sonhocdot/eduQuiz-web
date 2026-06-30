import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosClient from '../api/axios';

export default function Login() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ email: '', password: '', login_type: 'client' });
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); setMessage(''); setLoading(true);
        try {
            const response = await axiosClient.post('/login', formData);
            if (response.data.success) {
                localStorage.setItem('access_token', response.data.access_token);
                localStorage.setItem('user', JSON.stringify(response.data.user));
                formData.login_type === 'backoffice' ? navigate('/admin/dashboard') : navigate('/dashboard');
            }
        } catch (error) {
            if (error.response?.status === 422) setErrors(error.response.data.errors);
            else setMessage(error.response?.data?.message || 'Đăng nhập thất bại.');
        } finally { setLoading(false); }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                
                {/* Bên trái: Banner thương hiệu */}
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
                    
                    {/* Decor dải sáng tròn phía sau */}
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Bên phải: Form đăng nhập */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold text-gray-800">Chào mừng trở lại!</h2>
                        <p className="text-gray-400 text-sm mt-1">Vui lòng đăng nhập để tiếp tục buổi học.</p>
                    </div>

                    {message && (
                        <div className="mb-4 p-3.5 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-r-xl text-sm font-medium">
                            {message}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Selector phân quyền cầu kỳ */}
                        <div className="bg-gray-100 p-1 rounded-xl flex">
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, login_type: 'client' })}
                                className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${formData.login_type === 'client' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                Học Viên
                            </button>
                            <button
                                type="button"
                                onClick={() => setFormData({ ...formData, login_type: 'backoffice' })}
                                className={`flex-1 text-center py-2 text-sm font-semibold rounded-lg transition-all ${formData.login_type === 'backoffice' ? 'bg-white text-indigo-600 shadow-sm' : 'text-gray-500 hover:text-gray-800'}`}
                            >
                                Ban Quản Trị
                            </button>
                        </div>

                        <div >
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ Email</label>
                            <input
                                type="email" name="email" value={formData.email} onChange={handleChange}
                                className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                placeholder="name@example.com"
                            />
                            {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email[0]}</p>}
                        </div>

                        <div>
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Mật khẩu</label>
                                <span className="text-xs text-indigo-600 hover:underline cursor-pointer font-medium">Quên mật khẩu?</span>
                            </div>
                            <input
                                type="password" name="password" value={formData.password} onChange={handleChange}
                                className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                placeholder="••••••••"
                            />
                            {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password[0]}</p>}
                        </div>

                        <button
                            type="submit" disabled={loading}
                            className="w-full py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 active:scale-[0.98] shadow-lg shadow-indigo-200 transition-all disabled:opacity-50 disabled:pointer-events-none"
                        >
                            {loading ? 'Đang xác thực dữ liệu...' : 'Đăng Nhập Hệ Thống'}
                        </button>
                    </form>

                    <div className="mt-8 pt-6 border-t border-gray-100 text-center text-sm text-gray-500">
                        Bạn chưa có tài khoản?{' '}
                        <span onClick={() => navigate('/register')} className="text-indigo-600 font-bold hover:underline cursor-pointer">
                            Tạo tài khoản học viên
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}