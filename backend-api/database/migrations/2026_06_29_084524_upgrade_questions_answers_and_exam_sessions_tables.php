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
        // 1. Nâng cấp bảng questions (Bài nghe & loại câu hỏi)
        Schema::table('questions', function (Blueprint $table) {
            $table->string('audio_url')->nullable()->default(null)->comment('File nghe')->after('question_text');
            $table->enum('type', ['single_choice', 'multiple_choice', 'fill_in_the_blank', 'matching'])
                  ->default('single_choice')
                  ->comment('Dạng câu hỏi')
                  ->after('difficulty');
            
            $table->index('type'); // Tối ưu tìm kiếm theo dạng bài
        });

        // 2. Nâng cấp bảng answers (Thứ tự ô trống & Nối từ)
        Schema::table('answers', function (Blueprint $table) {
            $table->integer('blank_order')->nullable()->default(null)->comment('Thứ tự ô trống')->after('answer_text');
            $table->text('matching_value')->nullable()->default(null)->comment('Vế đối ứng bên phải')->after('blank_order');
        });

        // 3. Nâng cấp bảng exam_sessions (Bảo mật phòng thi)
        Schema::table('exam_sessions', function (Blueprint $table) {
            $table->string('password')->nullable()->default(null)->comment('Mật khẩu phòng thi')->after('exam_code');
            $table->string('allowed_ip_range')->nullable()->default(null)->comment('Giới hạn dải IP LAN')->after('password');
            $table->integer('max_tab_switches')->default(3)->comment('Số lần chuyển tab tối đa')->after('allowed_ip_range');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Logic hạ cấp (Xóa cột khi rollback)
        Schema::table('exam_sessions', function (Blueprint $table) {
            $table->dropColumn(['password', 'allowed_ip_range', 'max_tab_switches']);
        });

        Schema::table('answers', function (Blueprint $table) {
            $table->dropColumn(['blank_order', 'matching_value']);
        });

        Schema::table('questions', function (Blueprint $table) {
            $table->dropIndex(['type']);
            $table->dropColumn(['audio_url', 'type']);
        });
    }
};
