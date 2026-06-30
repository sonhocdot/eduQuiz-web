<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Question extends Model
{
    protected $fillable = ['chapter_id', 'question_text', 'difficulty', 'explanation', 'created_by','audio_url', 'type', 'usage_type'];

    // Ràng buộc enum của cột difficulty
    // (Nếu dùng Laravel 11+, bạn có thể kết hợp thêm PHP Enum để quản lý 'easy', 'medium', 'hard')
    
    public function chapter()
    {
        return $this->belongsTo(Chapter::class);
    }

    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    // Các đáp án lựa chọn của câu hỏi này
    public function answers()
    {
        return $this->hasMany(Answer::class);
    }

    // Thuộc các bộ đề (quizzes) nào
    public function quizzes()
    {
        return $this->belongsToMany(Quiz::class, 'quiz_question')
                    ->withPivot('order');
    }
}
