import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../services/authApi';

export default function RegisterForm() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({ name: '', email: '', password: '', password_confirmation: '' });
    const [showPass, setShowPass] = useState(false);
    const [showConfirmPass, setShowConfirmPass] = useState(false);
    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({}); setMessage(''); setLoading(true);
        try {
            const response = await authApi.register(formData);
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
        <div className="w-full">
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
                        placeholder="Nguyễn Văn A" required
                    />
                    {errors.name && <p className="text-rose-500 text-xs mt-1">{errors.name[0]}</p>}
                </div>

                {/* Email */}
                <div>
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Địa chỉ Email</label>
                    <input
                        type="email" name="email" value={formData.email} onChange={handleChange}
                        className="mt-1 block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                        placeholder="name@example.com" required
                    />
                    {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email[0]}</p>}
                </div>

                {/* Mật khẩu & Nhập lại mật khẩu */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Mật khẩu</label>
                        <div className="relative mt-1">
                            <input
                                type={showPass ? 'text' : 'password'}
                                name="password" value={formData.password} onChange={handleChange}
                                className="block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                placeholder="••••••••" required
                            />
                            <button type="button" onClick={() => setShowPass(!showPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {showPass ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                                )}
                            </button>
                        </div>
                        {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password[0]}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider">Xác nhận mật khẩu</label>
                        <div className="relative mt-1">
                            <input
                                type={showConfirmPass ? 'text' : 'password'}
                                name="password_confirmation" value={formData.password_confirmation} onChange={handleChange}
                                className="block w-full rounded-xl bg-gray-50 border-gray-200 shadow-sm focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100 transition-all p-3 border text-sm"
                                placeholder="••••••••" required
                            />
                            <button type="button" onClick={() => setShowConfirmPass(!showConfirmPass)} className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600">
                                {showConfirmPass ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 1-4.243-4.243m4.242 4.242L9.88 9.88" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <button
                    type="submit" disabled={loading}
                    className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 active:scale-[0.98] shadow-lg shadow-indigo-200 transition-all disabled:opacity-50"
                >
                    {loading ? 'Đang khởi tạo tài khoản...' : 'Kích Hoạt Tài Khoản Học Viên'}
                </button>
            </form>
        </div>
    );
}