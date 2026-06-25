<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chapter extends Model
{
    protected $fillable = ['subject_id', 'name', 'order'];

    protected $casts = [
        'order' => 'integer',
    ];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }

    // Các câu hỏi thuộc chương này
    public function questions()
    {
        return $this->hasMany(Question::class);
    }
}
