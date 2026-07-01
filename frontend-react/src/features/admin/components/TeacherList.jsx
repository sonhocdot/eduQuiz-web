import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';

export default function TeacherList() {
    const [teachers, setTeachers] = useState([]);
    const [page, setPage] = useState(1);

    const loadTeachers = async () => {
        try {
            const res = await adminApi.getTeachers(page);
            if (res.data.success) setTeachers(res.data.data.data);
        } catch (e) { console.error(e); }
    };

    useEffect(() => { loadTeachers(); }, [page]);

    return (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-xs font-bold text-gray-400 uppercase tracking-wider">
                        <th className="p-4">Giảng viên</th>
                        <th className="p-4">Môn phụ trách (Phân công)</th>
                        <th className="p-4 text-right">Hành động</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-50 text-sm">
                    {teachers.map((teacher) => (
                        <tr key={teacher.id} className="hover:bg-gray-50/50 transition-all">
                            <td className="p-4">
                                <div className="font-bold text-gray-800">{teacher.name}</div>
                                <div className="text-xs text-gray-400 mt-0.5">{teacher.email}</div>
                            </td>
                            <td className="p-4">
                                <div className="flex flex-wrap gap-1.5">
                                    {teacher.subjects && teacher.subjects.length > 0 ? (
                                        teacher.subjects.map(sub => (
                                            <span key={sub.id} className="bg-indigo-50 text-indigo-600 text-xs font-semibold px-2 py-1 rounded-lg">
                                                {sub.name}
                                            </span>
                                        ))
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">Chưa phân công môn nào</span>
                                    )}
                                </div>
                            </td>
                            <td className="p-4 text-right">
                                <button className="text-xs bg-amber-50 text-amber-600 font-bold px-3 py-1.5 rounded-xl hover:bg-amber-100 transition-all">
                                    ⚙️ Cập nhật phân công
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}