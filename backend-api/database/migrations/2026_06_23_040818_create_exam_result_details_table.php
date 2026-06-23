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
        Schema::create('exam_result_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('exam_result_id')->constrained('exam_results')->onDelete('cascade');
            $table->foreignId('question_id')->constrained('questions')->onDelete('cascade');

            // Liên kết ID đáp án để đối chiếu logic, cho set null nếu ngân hàng đề bị xóa sau này
            $table->foreignId('selected_answer_id')->nullable()->constrained('answers')->onDelete('set null');

            // Đóng băng phương án lựa chọn thực tế của học sinh (A, B, C, D) để phục vụ hiển thị lại
            $table->char('selected_option', 1)->nullable();

            $table->tinyInteger('is_correct')->default(0)->index(); // Phục vụ lọc nhanh cho "Sổ tay câu sai"
            $table->timestamps();

            $table->index(['exam_result_id', 'question_id']); // Phục vụ lưu vết Auto-save 10 giây/lần
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('exam_result_details');
    }
};
