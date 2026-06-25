<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ExamAuditLog extends Model
{
    // Tắt timestamps mặc định của Laravel vì bảng này chỉ dùng cột log_time riêng biệt
    public $timestamps = false; 

    protected $fillable = ['exam_session_id', 'user_id', 'action_type', 'details', 'log_time'];

    protected $casts = [
        'log_time' => 'datetime',
    ];

    public function examSession()
    {
        return $this->belongsTo(ExamSession::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
