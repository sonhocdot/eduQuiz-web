<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Quiz extends Model
{
    protected $fillable = ['subject_id', 'title', 'type', 'duration', 'total_questions', 'created_by'];

    protected $casts = [
        'duration' => 'integer',
        'total_questions' => 'integer',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Danh sách câu hỏi trong đề (Nhiều - Nhiều qua bảng trung gian quiz_question)
    public function questions()
    {
        return $this->belongsToMany(Question::class, 'quiz_question')
                    ->withPivot('order')
                    ->orderBy('quiz_question.order');
    }

    // Các đợt mở phòng thi (Exam Sessions) của đề này
    public function examSessions()
    {
        return $this->hasMany(ExamSession::class);
    }

    // Kết quả thi của các user làm đề này
    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }
}
