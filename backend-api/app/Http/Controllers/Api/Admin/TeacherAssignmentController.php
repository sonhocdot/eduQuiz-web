<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Gate;

class TeacherAssignmentController extends Controller
{
public function assignSubjects(Request $request, int $id)
    {
        if (Gate::denies('isAdmin')) {
            return response()->json(['success' => false, 'message' => 'Từ chối truy cập!'], 403);
        }

        $request->validate([
            'subject_ids' => 'required|array', // Truyền lên một mảng ID môn học, ví dụ: [1, 2, 3]
            'subject_ids.*' => 'exists:subjects,id' // Từng ID trong mảng phải tồn tại trong bảng subjects
        ]);

        $teacher = User::where('id', $id)->where('role', 'teacher')->firstOrFail();

        // Sử dụng phương thức sync() của Eloquent để đồng bộ bảng trung gian subject_user
        // Nó sẽ tự động xóa các môn cũ không chọn và thêm các môn mới được truyền lên
        $teacher->subjects()->sync($request->subject_ids);

        return response()->json([
            'success' => true,
            'message' => 'Phân công môn học cho giảng viên thành công.',
            'assigned_subjects' => $teacher->subjects()->get(['subjects.id', 'subjects.name'])
        ], 200);
    }
}
