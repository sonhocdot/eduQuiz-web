<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamResultDetail extends Model
{
    // Chỉ định tên bảng thủ công vì Laravel mặc định số nhiều sẽ là exam_result_details
    protected $table = 'exam_result_details'; 

    protected $fillable = [
        'exam_result_id', 
        'question_id', 
        'selected_answer_id', 
        'selected_option', 
        'is_correct'
    ];

    protected $casts = [
        'is_correct' => 'boolean',
    ];

    public function examResult()
    {
        return $this->belongsTo(ExamResult::class);
    }

    public function question()
    {
        return $this->belongsTo(Question::class);
    }

    // Đáp án được chọn (Có thể NULL nếu bỏ trống không khoanh)
    public function selectedAnswer()
    {
        return $this->belongsTo(Answer::class, 'selected_answer_id');
    }
}