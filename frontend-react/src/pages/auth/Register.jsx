import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RegisterForm } from '@/features/auth';

export default function Register() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 p-4">
            <div className="max-w-4xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden grid md:grid-cols-2">
                
                {/* Bên trái: Khung Banner */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-indigo-600 to-purple-700 text-white relative">
                    <div className="space-y-2">
                        <div className="text-2xl font-black tracking-wider">EDUQUIZ.</div>
                        <p className="text-indigo-200 text-sm">Hệ thống khảo thí trực tuyến thông minh.</p>
                    </div>
                    <div className="text-xs text-indigo-200/50">© 2026 EduQuiz. All rights reserved.</div>
                    <div className="absolute -top-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                </div>

                {/* Bên phải: Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <RegisterForm />
                    
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