<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Question;
use App\Models\Answer;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;

class QuestionController extends Controller
{
    public function index(Request $request)
    {
        $request->validate(['chapter_id' => 'required|exists:chapters,id']);

        $questions = Question::where('chapter_id', $request->chapter_id)
            ->with('answers') // Eager load các đáp án đi kèm
            ->paginate(15);

        return response()->json(['success' => true, 'data' => $questions]);
    }

    public function store(Request $request)
    {
        if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền này.'], 403);
        }

        $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'question_text' => 'required|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'explanation' => 'nullable|string',
            'answers' => 'required|array|min:2', // Phải có ít nhất 2 đáp án
            'answers.*.answer_text' => 'required|string',
            'answers.*.is_correct' => 'required|boolean', // 1 nếu là đáp án đúng, 0 nếu sai
        ]);

        try {
            DB::beginTransaction();

            // 1. Tạo câu hỏi
            $question = Question::create([
                'chapter_id'    => $request->chapter_id,
                'question_text' => $request->question_text,
                'difficulty'    => $request->difficulty,
                'explanation'   => $request->explanation,
                'created_by'    => Auth::id(), // Lấy ID người dùng hiện tại
            ]);

            // 2. Tối ưu: Dùng createMany để gộp thành 1 câu lệnh INSERT duy nhất
            $question->answers()->createMany($request->answers);

            DB::commit();

            return response()->json([
                'success' => true,
                'message' => 'Tạo câu hỏi và đáp án thành công!',
                'data'    => $question->load('answers')
            ], 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['success' => false, 'message' => 'Có lỗi xảy ra: ' . $e->getMessage()], 500);
        }
    }
public function updateWithUpsert(Request $request, int $id)
{
    if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Bạn không có quyền này.'], 403);
        }
    
    $request->validate([
        $request->validate([
            'chapter_id' => 'required|exists:chapters,id',
            'question_text' => 'required|string',
            'difficulty' => 'required|in:easy,medium,hard',
            'explanation' => 'nullable|string',
            'answers' => 'required|array|min:2', // Phải có ít nhất 2 đáp án
            'answers.*.answer_text' => 'required|string',
            'answers.*.is_correct' => 'required|boolean', // 1 nếu là đáp án đúng, 0 nếu sai
        ])
        
    ]);

    $question = Question::findOrFail($id);

    try {
        DB::beginTransaction();

        // 1. Cập nhật câu hỏi
        $question->update($request->only(['chapter_id', 'question_text', 'difficulty', 'explanation']));

        // 2. Xử lý đáp án nâng cao:
        $answerIdsSent = [];
        $answersToUpsert = [];

        foreach ($request->answers as $ans) {
            $answersToUpsert[] = [
                'id' => $ans['id'] ?? null, // Nếu đáp án cũ thì có ID, đáp án mới thì null
                'question_id' => $question->id,
                'answer_text' => $ans['answer_text'],
                'is_correct' => $ans['is_correct'],
                'updated_at' => now(),
                'created_at' => now()
            ];

            if (!empty($ans['id'])) {
                $answerIdsSent[] = $ans['id'];
            }
        }

        // Bước A: Xóa những đáp án cũ ở database mà KHÔNG ĐƯỢC gửi lên trong request lần này
        $question->answers()->whereNotIn('id', $answerIdsSent)->delete();

        // Bước B: Thực hiện gộp INSERT hoặc UPDATE trong đúng 1 câu lệnh duy nhất
        // Tham số 1: Mảng dữ liệu
        // Tham số 2: Cột dùng để check trùng (Primary key)
        // Tham số 3: Các cột sẽ được update nếu bị trùng
        Answer::upsert($answersToUpsert, ['id'], ['answer_text', 'is_correct', 'updated_at']);

        DB::commit();
        return response()->json(['success' => true, 'message' => 'Cập nhật thành công!', 'data' => $question->load('answers')]);

    } catch (\Exception $e) {
        DB::rollBack();
        return response()->json(['success' => false, 'message' => 'Lỗi: ' . $e->getMessage()], 500);
    }
}
    public function destroy(int $id)
    {
        if (Gate::denies('isTeacher')) {
            return response()->json(['success' => false, 'message' => 'Từ chối truy cập!'], 403);
        }

        $question = Question::findOrFail($id);
        $question->delete();

        return response()->json(['success' => true, 'message' => 'Xóa câu hỏi thành công.']);
    }
}
