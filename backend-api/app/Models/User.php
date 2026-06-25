<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Attributes\Fillable;
use Illuminate\Database\Eloquent\Attributes\Hidden;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

#[Fillable(['name', 'email', 'password','role'])]
#[Hidden(['password', 'remember_token'])]
class User extends Authenticatable
{
    /** @use HasFactory<UserFactory> */
    use HasFactory, Notifiable,HasAPITokens;

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'role' => 'string',
        ];
    }
    public function isAdmin()
    {
        return $this->role === 'admin';
    }

    public function isTeacher()
    {
        return $this->role === 'teacher';
    }

    public function isStudent()
    {
        return $this->role === 'student';
    }

    // Các mối quan hệ giữ nguyên từ file eduquiz_db.sql
    public function subjects()
    {
        return $this->belongsToMany(Subject::class, 'subject_user');
    }

    public function questions()
    {
        return $this->hasMany(Question::class, 'created_by');
    }

    public function quizzes()
    {
        return $this->hasMany(Quiz::class, 'created_by');
    }

    public function examResults()
    {
        return $this->hasMany(ExamResult::class);
    }

    public function examAuditLogs()
    {
        return $this->hasMany(ExamAuditLog::class);
    }
}
