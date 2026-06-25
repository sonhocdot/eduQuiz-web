<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    protected $fillable = ['name', 'code'];

    // Danh sách chương của môn học
    public function chapters()
    {
        return $this->hasMany(Chapter::class);
    }

    // Danh sách bộ đề (quizzes) thuộc môn học
    public function quizzes()
    {
        return $this->hasMany(Quiz::class);
    }

    // Các User tham gia môn học này
    public function users()
    {
        return $this->belongsToMany(User::class, 'subject_user');
    }
}
