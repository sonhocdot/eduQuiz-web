import React from 'react';
import { CategoryManager } from '@/features/admin';
import { PageHeader } from '@/features/admin'; // Import linh kiện tiêu đề

export default function AdminCategories() {
    const handleAddSubject = () => {
        alert("Kích hoạt form/modal tạo Môn học mới!");
    };

    return (
        <div className="w-full space-y-5">
            {/* Nhúng Component Tiêu đề ngang */}
            <PageHeader 
                title="Cây Danh Mục Hệ Thống"
                description="Quản lý cấu trúc đa cấp từ Môn Học đến các Chương/Bài học chi tiết."
                buttonText="Thêm Môn Học Mới"
                onButtonClick={handleAddSubject}
            />
            
            {/* Vùng chứa dữ liệu chính */}
            <div className="w-full bg-white p-5 rounded-xl border border-gray-200/60 shadow-sm text-left">
                <CategoryManager />
            </div>
        </div>
    );
}