<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamSession extends Model
{
    protected $fillable = ['quiz_id', 'exam_code', 'start_time', 'end_time', 'status','password', 'allowed_ip_range', 'max_tab_switches'];

    protected $casts = [
        'start_time' => 'datetime',
        'end_time' => 'datetime',
    ];

    public function quiz()
    {
        return $this->belongsTo(Quiz::class);
    }

    // Kết quả làm bài thuộc ca thi này
    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }

    // Nhật ký gian lận/hành vi trong ca thi này
    public function auditLogs()
    {
        return $this->hasMany(ExamAuditLog::class);
    }
}
