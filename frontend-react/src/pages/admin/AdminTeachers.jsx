import React from 'react';
import { TeacherList } from '@/features/admin';
import { PageHeader } from '@/features/admin'; // Import linh kiện tiêu đề

export default function AdminTeachers() {
    return (
        <div className="w-full space-y-5">
            {/* Nhúng Component Tiêu đề ngang (không truyền nút bấm) */}
            <PageHeader 
                title="Hội Đồng Giảng Viên"
                description="Quản lý danh sách tài khoản giảng viên và cấu hình phân chia quyền phụ trách các môn học thi."
            />
            
            <div className="w-full text-left">
                <TeacherList />
            </div>
        </div>
    );
}