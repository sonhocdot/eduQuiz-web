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
       Schema::table('questions', function (Blueprint $table) {
            // Thêm cột usage_type dạng ENUM, mặc định nếu không chọn sẽ là 'hybrid' (dùng cho cả hai)
            $table->enum('usage_type', ['practice_only', 'exam_only', 'hybrid'])
                  ->default('hybrid')
                  ->after('type'); // Đặt sau cột type hiện tại
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('questions', function (Blueprint $table) {
            $table->dropColumn('usage_type');
        });
    }
};
