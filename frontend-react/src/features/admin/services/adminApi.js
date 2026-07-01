import axiosClient from '@/services/axios';

export const adminApi = {
    // ==========================================
    // 1. KHỐI DANH MỤC MÔN HỌC & CHƯƠNG (CategoryController)
    // ==========================================
    
    // Lấy toàn bộ cây danh mục đa cấp: Môn học -> Chương [GET /admin/categories/tree]
    getCategoryTree: () => axiosClient.get('/admin/categories/tree'),
    
    // Thêm môn học mới (Chỉ Admin tổng) [POST /admin/subjects]
    storeSubject: (data) => axiosClient.post('/admin/subjects', data),
    
    // Sửa tên môn học (Chỉ Admin tổng) [PUT /admin/subjects/{id}]
    updateSubject: (id, data) => axiosClient.put(`/admin/subjects/${id}`, data),

    // Thêm chương/bài mới (Giảng viên được phân quyền) [POST /admin/chapters]
    storeChapter: (data) => axiosClient.post('/admin/chapters', data),
    
    // Chỉnh sửa chương/bài [PUT /admin/chapters/{id}]
    updateChapter: (id, data) => axiosClient.put(`/admin/chapters/${id}`, data),
    
    // Xóa chương/bài khỏi môn học [DELETE /admin/chapters/{id}]
    destroyChapter: (id) => axiosClient.delete(`/admin/chapters/${id}`),


    // ==========================================
    // 2. KHỐI QUẢN LÝ HỌC VIÊN (StudentManagementController)
    // ==========================================
    
    // Lấy danh sách học viên phân trang [GET /admin/students?page={page}]
    getStudents: (page = 1) => axiosClient.get(`/admin/students?page=${page}`),
    
    // Thêm tài khoản học viên mới [POST /admin/students]
    storeStudent: (data) => axiosClient.post('/admin/students', data),
    
    // Cập nhật thông tin học viên (Tên, Email) [PUT /admin/students/{id}]
    updateStudent: (id, data) => axiosClient.put(`/admin/students/${id}`, data),
    
    // Khóa hoặc kích hoạt lại tài khoản học viên [PATCH /admin/students/{id}/toggle-status]
    toggleStudentStatus: (id, status) => axiosClient.patch(`/admin/students/${id}/toggle-status`, { status }),
    
    // Đặt lại mật khẩu học viên mới [PATCH /admin/students/{id}/reset-password]
    resetStudentPassword: (id, password) => axiosClient.patch(`/admin/students/${id}/reset-password`, { password }),


    // ==========================================
    // 3. KHỐI QUẢN LÝ GIẢNG VIÊN & PHÂN CÔNG (TeacherManagement & TeacherAssignment)
    // ==========================================
    
    // Lấy danh sách giảng viên kèm môn phụ trách [GET /admin/teachers?page={page}]
    getTeachers: (page = 1) => axiosClient.get(`/admin/teachers?page=${page}`),
    
    // Tạo tài khoản giảng viên mới [POST /admin/teachers]
    storeTeacher: (data) => axiosClient.post('/admin/teachers', data),
    
    // Cập nhật thông tin giảng viên [PUT /admin/teachers/{id}]
    updateTeacher: (id, data) => axiosClient.put(`/admin/teachers/${id}`, data),
    
    // Thay đổi trạng thái hoạt động giảng viên [PATCH /admin/teachers/{id}/toggle-status]
    toggleTeacherStatus: (id, status) => axiosClient.patch(`/admin/teachers/${id}/toggle-status`, { status }),
    
    // Phân công / Đồng bộ danh sách môn học phụ trách (sync) [POST /admin/teachers/{id}/assign-subjects]
    assignSubjects: (teacherId, subjectIds) => axiosClient.post(`/admin/teachers/${teacherId}/assign-subjects`, { subject_ids: subjectIds }),
};