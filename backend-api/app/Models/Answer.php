<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Answer extends Model
{
    protected $fillable = ['question_id', 'answer_text', 'is_correct','blank_order', 'matching_value'];

    protected $casts = [
        'is_correct' => 'boolean', // tinyint tự động cast về true/false cho tiện xử lý
    ];

    public function question()
    {
        return $this->belongsTo(Question::class);
    }
}
