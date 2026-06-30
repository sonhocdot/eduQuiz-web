<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Gate;

class StudentManagementController extends Controller
{
    // Giảng viên & Admin đều xem được danh sách học viên
    public function index()
    {
        $students = User::where('role', 'student')->paginate(10);
        return response()->json(['success' => true, 'data' => $students]);
    }

    // Chỉ Admin tổng mới được thêm học viên
    public function store(Request $request)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền này!'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6'
        ]);

        $student = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student'
        ]);

        return response()->json(['success' => true, 'data' => $student], 201);
    }

    public function update(Request $request,int $id)
{
    // 1. Kiểm tra quyền hạn bằng Gate (Chỉ admin mới được sửa)
    if (Gate::denies('isAdmin')) {
        return response()->json([
            'success' => false,
            'message' => 'Từ chối truy cập! Bạn không có quyền sửa thông tin học viên.'
        ], 403);
    }

    // 2. Tìm học viên cần sửa trong DB, nếu không thấy trả về lỗi 404
    $student = User::where('id', $id)->where('role', 'student')->firstOrFail();

    // 3. Validate dữ liệu gửi lên từ React
    // Dùng rule 'unique:users,email,'.$id để tránh lỗi báo trùng Email với CHÍNH NÓ khi không sửa email
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $id,
    ]);

    // 4. Tiến hành cập nhật vào Database
    $student->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    // 5. Trả kết quả JSON về cho React
    return response()->json([
        'success' => true,
        'message' => 'Cập nhật thông tin học viên thành công.',
        'data' => [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
            'role' => $student->role
        ]
    ], 200);
}
    public function toggleStatus(Request $request, int $id)
{
    // 1. Kiểm tra quyền hạn bằng Gate (Chỉ admin mới có quyền khóa/bật)
    if (Gate::denies('isAdmin')) {
        return response()->json([
            'success' => false,
            'message' => 'Từ chối truy cập! Bạn không có quyền thay đổi trạng thái tài khoản.'
        ], 403);
    }

    // 2. Validate trạng thái gửi lên từ React
    $request->validate([
        'status' => 'required|in:active,banned'
    ]);

    // 3. Tìm học viên cần xử lý
    $student = User::where('id', $id)->where('role', 'student')->firstOrFail();

    // 4. Cập nhật trạng thái mới vào DB
    $student->update([
        'status' => $request->status
    ]);

    $message = $request->status === 'banned' 
        ? 'Đã khóa tài khoản học viên thành công.' 
        : 'Đã bật (mở khóa) tài khoản học viên thành công.';

    // 5. Trả JSON về cho React
    return response()->json([
        'success' => true,
        'message' => $message,
        'data' => [
            'id' => $student->id,
            'name' => $student->name,
            'email' => $student->email,
            'status' => $student->status
        ]
    ], 200);
}
    // Admin tổng reset mật khẩu học viên
    public function resetPassword(Request $request,int $id)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền này!'], 403);
        }

        $request->validate(['password' => 'required|string|min:6']);

        $student = User::where('id', $id)->where('role', 'student')->firstOrFail();
        $student->update(['password' => Hash::make($request->password)]);

        return response()->json(['success' => true, 'message' => 'Đặt lại mật khẩu thành công.']);
    }
}
