import React from 'react';
import { StudentList } from '@/features/admin';
import { PageHeader } from '@/features/admin'; // Import linh kiện tiêu đề

export default function AdminStudents() {
    const handleAddStudent = () => {
        alert("Kích hoạt form/modal cấp tài khoản học viên mới!");
    };

    return (
        <div className="w-full space-y-5">
            {/* Nhúng Component Tiêu đề ngang */}
            <PageHeader 
                title="Quản lý Tài khoản Học Viên"
                description="Xem danh sách, kiểm soát trạng thái hoạt động hoặc cấp lại mật khẩu học viên."
                buttonText="Tạo Tài Khoản Học Viên"
                onButtonClick={handleAddStudent}
            />
            
            <div className="w-full text-left">
                <StudentList />
            </div>
        </div>
    );
}