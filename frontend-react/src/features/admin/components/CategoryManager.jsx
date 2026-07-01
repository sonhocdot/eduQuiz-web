import React, { useState, useEffect } from 'react';
import { adminApi } from '../services/adminApi';

export default function CategoryManager() {
    const [treeData, setTreeData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeSubjectId, setActiveSubjectId] = useState(null); // Để đóng/mở xem danh sách chương

    const fetchCategories = async () => {
        try {
            const res = await adminApi.getCategoryTree();
            if (res.data.success) setTreeData(res.data.data);
        } catch (err) {
            console.error("Lỗi tải danh mục", err);
        } finally { setLoading(false); }
    };

    useEffect(() => { fetchCategories(); }, []);

    if (loading) return <div className="text-center py-10 text-gray-400">Đang tải cây danh mục...</div>;

    return (
        <div className="w-full space-y-4 text-left">
            {treeData.map((subject) => (
                <div key={subject.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    {/* Header môn học */}
                    <div className="p-5 flex items-center justify-between bg-gradient-to-r from-gray-50 to-white border-b border-gray-100">
                        <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setActiveSubjectId(activeSubjectId === subject.id ? null : subject.id)}>
                            <span className="text-xl">{activeSubjectId === subject.id ? '🔽' : '▶️'}</span>
                            <div>
                                <h3 className="font-bold text-gray-800">{subject.name}</h3>
                                <p className="text-xs text-indigo-600 font-mono mt-0.5">Mã môn: SUB_{subject.id}</p>
                            </div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-xs bg-indigo-50 text-indigo-600 font-bold px-3 py-1.5 rounded-xl hover:bg-indigo-100 transition-all">Sửa Môn ✏️</button>
                            <button className="text-xs bg-emerald-50 text-emerald-600 font-bold px-3 py-1.5 rounded-xl hover:bg-emerald-100 transition-all">+ Thêm Chương 📑</button>
                        </div>
                    </div>

                    {/* Danh sách chương lồng nhau */}
                    {activeSubjectId === subject.id && (
                        <div className="p-4 bg-gray-50/50 divide-y divide-gray-100">
                            {subject.chapters && subject.chapters.length > 0 ? (
                                subject.chapters.map((chapter) => (
                                    <div key={chapter.id} className="py-3 px-4 flex items-center justify-between text-sm hover:bg-white rounded-xl transition-all">
                                        <div className="flex items-center space-x-3">
                                            <span className="text-xs font-bold text-gray-400 bg-gray-100 w-6 h-6 flex items-center justify-center rounded-md">Stt {chapter.order}</span>
                                            <span className="font-semibold text-gray-700">{chapter.name}</span>
                                        </div>
                                        <div className="flex space-x-1">
                                            <button className="text-xs text-gray-500 hover:text-indigo-600 px-2 py-1">Sửa</button>
                                            <button className="text-xs text-gray-400 hover:text-rose-600 px-2 py-1">Xóa 🗑️</button>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-center py-6 text-xs text-gray-400">Môn học này chưa được tạo chương/bài học nào.</div>
                            )}
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
}