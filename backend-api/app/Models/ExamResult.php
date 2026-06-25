<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamResult extends Model
{
    protected $fillable = [
        'user_id', 
        'exam_session_id', 
        'quiz_id', 
        'score', 
        'started_at', 
        'completed_at', 
        'status'
    ];

    protected $casts = [
        'score' => 'decimal:2',
        'started_at' => 'datetime',
        'completed_at' => 'datetime',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function examSession()
    {
        return $this->belongsTo(ExamSession::class);
    }

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    // Chi tiết câu trả lời cho từng câu hỏi trong bài làm này
    public function details()
    {
        return $this->hasMany(ExamResultDetail::class);
    }
}
