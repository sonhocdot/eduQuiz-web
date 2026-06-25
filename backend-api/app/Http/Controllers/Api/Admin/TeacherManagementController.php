<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Hash;

class TeacherManagementController extends Controller
{
    public function index()
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Chỉ Admin tổng mới có quyền này.'], 403);
        }

        // Lấy các user có quyền là teacher, eader load luôn quan hệ 'subjects' từ bảng subject_user
        $teachers = User::where('role', 'teacher')
            ->with('subjects:id,name') 
            ->paginate(10);

        return response()->json(['success' => true, 'data' => $teachers], 200);
    }
    public function store(Request $request)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Từ chối truy cập!'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6',
        ]);

        $teacher = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'teacher', 
            'status' => 'active'
        ]);

        return response()->json(['success' => true, 'message' => 'Tạo tài khoản giảng viên thành công.', 'data' => $teacher], 201);
    }

    public function update(Request $request, int $id)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Từ chối truy cập!'], 403);
        }

        $teacher = User::where('id', $id)->where('role', 'teacher')->firstOrFail();

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email,' . $id,
        ]);

        $teacher->update([
            'name' => $request->name,
            'email' => $request->email
        ]);

        return response()->json(['success' => true, 'message' => 'Cập nhật giảng viên thành công.', 'data' => $teacher], 200);
    }

    public function toggleStatus(Request $request, int $id)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Từ chối truy cập!'], 403);
        }

        $request->validate(['status' => 'required|in:active,banned']);

        $teacher = User::where('id', $id)->where('role', 'teacher')->firstOrFail();
        $teacher->update(['status' => $request->status]);

        return response()->json([
            'success' => true, 
            'message' => $request->status === 'banned' ? 'Đã khóa tài khoản giảng viên.' : 'Đã kích hoạt lại tài khoản giảng viên.'
        ], 200);
    }

    
}
