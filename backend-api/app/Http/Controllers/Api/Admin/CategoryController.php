<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Subject;
use Illuminate\Support\Facades\DB;
use App\Models\Chapter;
use App\Models\Question;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Auth;


class CategoryController extends Controller
{
    private function checkSubjectPermission(int $subjectId): bool
    {
        // 1. Nếu là Admin tổng thì luôn cho phép vượt qua
        if (Gate::allows('isAdmin')) {
            return true;
        }

        // 2. Nếu là Giảng viên, kiểm tra bảng subject_user
        $userId = Auth::id();
        $hasPermission = DB::table('subject_user')
            ->where('user_id', $userId)
            ->where('subject_id', $subjectId)
            ->exists();

        return $hasPermission;
    }
    // Lấy toàn bộ cây danh mục đa cấp: Môn học -> Chương
    public function getCategoryTree()
    {
        $tree = Subject::with(['chapters' => function($query) {
            $query->orderBy('order', 'asc');
        }])->get();

        return response()->json(['success' => true, 'data' => $tree], 200);
    }

    public function storeSubject(Request $request)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Chỉ Admin tổng mới được tạo môn học mới.'], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255|unique:subjects,name',
        ]);

        $subject = Subject::create([
            'name' => $request->name,
            'questions_count' => 0
        ]);

        return response()->json(['success' => true, 'data' => $subject], 201);
    }
    public function updateSubject(Request $request, int $id)
{
    // 1. Kiểm tra quyền Admin bằng Gate
    if (Gate::denies('isAdmin')) {
        return response()->json([
            'success' => false,
            'message' => 'Từ chối truy cập! Chỉ Admin tổng mới có quyền sửa môn học.'
        ], 403);
    }

    // 2. Tìm môn học, nếu không thấy tự động trả về lỗi 404
    $subject = Subject::findOrFail($id);

    // 3. Validate dữ liệu đầu vào từ React gửi lên
    // Tránh báo trùng tên với CHÍNH NÓ khi người dùng không thay đổi tên môn
    $request->validate([
        'name' => 'required|string|max:255|unique:subjects,name,' . $id,
    ]);

    // 4. Tiến hành cập nhật Database
    $subject->update([
        'name' => $request->name,
    ]);

    // 5. Trả dữ liệu JSON về cho React
    return response()->json([
        'success' => true,
        'message' => 'Cập nhật thông tin môn học thành công.',
        'data' => $subject
    ], 200);
}

    public function storeChapter(Request $request)
    {
        if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền thao tác.'], 403);
        }

        $request->validate([
            'subject_id' => 'required|exists:subjects,id',
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer'
        ]);

        // 🔐 KIỂM TRA QUYỀN CHUYÊN SÂU
        if (!$this->checkSubjectPermission((int)$request->subject_id)) {
            return response()->json([
                'success' => false, 
                'message' => 'Từ chối! Bạn không được phân công phụ trách môn học này.'
            ], 403);
        }

        $chapter = Chapter::create([
            'subject_id' => $request->subject_id,
            'name' => $request->name,
            'order' => $request->order ?? 0
        ]);

        return response()->json(['success' => true, 'data' => $chapter], 201);
    }

    public function updateChapter(Request $request, int $id)
    {
        if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền chỉnh sửa.'], 403);
        }

        $chapter = Chapter::findOrFail($id);

        // 🔐 KIỂM TRA QUYỀN: Lấy subject_id trực tiếp từ Chương đang muốn sửa
        if (!$this->checkSubjectPermission((int)$chapter->subject_id)) {
            return response()->json([
                'success' => false, 
                'message' => 'Từ chối! Bạn không thể sửa chương của môn học mình không phụ trách.'
            ], 403);
        }

        $request->validate([
            'name' => 'required|string|max:255',
            'order' => 'nullable|integer'
        ]);

        $chapter->update([
            'name' => $request->name,
            'order' => $request->order ?? $chapter->order
        ]);

        return response()->json(['success' => true, 'data' => $chapter], 200);
    }

    public function destroyChapter(int $id)
    {
        if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền xóa.'], 403);
        }

        $chapter = Chapter::findOrFail($id);

        // 🔐 KIỂM TRA QUYỀN trước khi cho phép xóa
        if (!$this->checkSubjectPermission((int)$chapter->subject_id)) {
            return response()->json([
                'success' => false, 
                'message' => 'Từ chối! Bạn không thể xóa chương của môn học mình không phụ trách.'
            ], 403);
        }

        $chapter->delete();

        return response()->json(['success' => true, 'message' => 'Đã xóa chương/bài thành công.'], 200);
    }
}
