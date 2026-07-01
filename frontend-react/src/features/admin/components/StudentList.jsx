import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';

export default function StudentList() {
    const [students, setStudents] = useState([]);
    const [pagination, setPagination] = useState({});
    const [page, setPage] = useState(1);

    const loadStudents = async () => {
        try {
            const res = await adminApi.getStudents(page);
            if (res.data.success) {
                setStudents(res.data.data.data);
                setPagination(res.data.data);
            }
        } catch (e) { console.error(e); }
    };

    useEffect(() => { loadStudents(); }, [page]);

    const handleToggleStatus = async (id, currentStatus) => {
        const nextStatus = currentStatus === 'active' ? 'banned' : 'active';
        try {
            const res = await adminApi.toggleStudentStatus(id, nextStatus);
            if (res.data.success) loadStudents(); // Reload lại bảng
        } catch (e) { alert("Lỗi phân quyền hoặc xử lý"); }
    };

    return (
        <div className="space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                            <th className="p-4">Tên Học Viên</th>
                            <th className="p-4">Email</th>
                            <th className="p-4">Trạng thái</th>
                            <th className="p-4 text-right">Tác vụ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50 text-sm">
                        {students.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50/50 transition-all">
                                <td className="p-4 font-bold text-gray-800">{student.name}</td>
                                <td className="p-4 text-gray-600 font-mono text-xs">{student.email}</td>
                                <td className="p-4">
                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${student.status === 'active' ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'}`}>
                                        {student.status === 'active' ? 'Đang hoạt động' : 'Bị khóa'}
                                    </span>
                                </td>
                                <td className="p-4 text-right space-x-2">
                                    <button onClick={() => handleToggleStatus(student.id, student.status)} className={`text-xs font-bold px-3 py-1.5 rounded-xl transition-all ${student.status === 'active' ? 'bg-rose-50 text-rose-600 hover:bg-rose-100' : 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'}`}>
                                        {student.status === 'active' ? 'Khóa 🔒' : 'Mở khóa 🔓'}
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {/* Thanh Phân Trang */}
            <div className="flex justify-end space-x-2">
                <button disabled={page === 1} onClick={() => setPage(p => p - 1)} className="px-3 py-1.5 bg-white border rounded-xl text-xs font-bold disabled:opacity-50">Trước</button>
                <button disabled={page >= pagination.last_page} onClick={() => setPage(p => p + 1)} className="px-3 py-1.5 bg-white border rounded-xl text-xs font-bold disabled:opacity-50">Sau</button>
            </div>
        </div>
    );
}