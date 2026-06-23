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
        Schema::create('exam_audit_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_session_id')->constrained('exam_sessions')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->string('action_type', 50); // Ví dụ: TAB_OFF, RIGHT_CLICK
            $table->string('details')->nullable(); // Ví dụ: "Rời khỏi màn hình thi lần 1"
            $table->timestamp('log_time')->useCurrent();
            $table->index(['exam_session_id', 'user_id']); // Giảng viên theo dõi realtime theo ca và thí sinh
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_audit_logs');
    }
};
