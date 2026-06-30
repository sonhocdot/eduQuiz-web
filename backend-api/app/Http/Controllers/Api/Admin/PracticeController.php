<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class PracticeController extends Controller
{
    public function createChapterPracticeQuiz(Request $request)
    {
        if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền tạo đề.'], 403);
        }

        $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'title' => 'required|string|max:255', // Ví dụ: "Đề ôn tập Chương 1 - Phần Cấu trúc"
            'quantity' => 'required|integer|min:5|max:50', // Số câu muốn bốc (10, 15, 20...)
            'duration' => 'required|integer|min:5' // Thời gian làm bài
        ]);

        $chapterId = $request->chapter_id;
        $quantity = $request->quantity;

        // 1. Chỉ bốc ngẫu nhiên các câu hỏi thuộc CHƯƠNG được chọn
        $randomQuestionIds = Question::where('chapter_id', $chapterId)
            ->inRandomOrder()
            ->take($quantity)
            ->pluck('id')
            ->toArray();

        if (count($randomQuestionIds) < $quantity) {
            return response()->json([
                'success' => false, 
                'message' => 'Ngân hàng câu hỏi của chương này không đủ! Hiện chỉ có ' . count($randomQuestionIds) . ' câu.'
            ], 400);
        }

        try {
            DB::beginTransaction();

            // Lấy subject_id từ chương để gắn vào Quiz
            $subjectId = DB::table('chapters')->where('id', $chapterId)->value('subject_id');

            // 2. Tạo Đề luyện tập mẫu cho chương đó
            $quiz = Quiz::create([
                'subject_id' => $subjectId,
                'title' => $request->title,
                'type' => 'practice', // Loại đề luyện tập
                'duration' => $request->duration,
                'total_questions' => count($randomQuestionIds),
                'created_by' => Auth::id(),
            ]);

            // 3. Niêm phong danh sách câu hỏi vào quiz_question
            $quiz->questions()->sync($randomQuestionIds);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Đã tạo đề luyện tập theo chương thành công!',
                'quiz_id' => $quiz->id
            ], 201);

        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => $e->getMessage()], 500);
        }
    }


}
