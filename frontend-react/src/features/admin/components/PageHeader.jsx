import React from 'react';

export default function PageHeader({ title, description, buttonText, onButtonClick }) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 w-full bg-white px-6 py-4 rounded-xl border border-gray-200/60 shadow-sm">
            <div className="text-left">
                <h1 className="text-xl font-bold text-gray-800 tracking-tight">{title}</h1>
                {description && <p className="text-gray-400 text-xs mt-0.5">{description}</p>}
            </div>
            
            {/* Chỉ hiển thị nút bấm hành động nếu component cha truyền thuộc tính vào */}
            {buttonText && (
                <button 
                    onClick={onButtonClick}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs px-4 py-2.5 rounded-lg transition-all shadow-sm active:scale-95 flex items-center space-x-1.5 shrink-0"
                >
                    <span>➕</span>
                    <span>{buttonText}</span>
                </button>
            )}
        </div>
    );
}