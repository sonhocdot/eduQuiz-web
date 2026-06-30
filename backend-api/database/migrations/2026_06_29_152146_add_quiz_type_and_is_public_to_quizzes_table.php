<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('quizzes', function (Blueprint $table) {
            // 1. Thêm cột quiz_type dạng ENUM để phân loại thành phẩm Đề thi
            $table->enum('quiz_type', ['official_exam', 'teacher_practice', 'student_self_practice'])
                  ->default('official_exam')
                  ->after('title'); // Đặt ngay sau cột tiêu đề đề thi

            // 2. Thêm cột is_public để bật/tắt hiển thị đề ôn tập công khai
            $table->boolean('is_public')
                  ->default(false)
                  ->after('quiz_type'); // Đặt ngay sau cột quiz_type
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('quizzes', function (Blueprint $table) {
            // Xóa hai cột vừa thêm nếu thực hiện lệnh rollback
            $table->dropColumn(['quiz_type', 'is_public']);
        });
    }
};
