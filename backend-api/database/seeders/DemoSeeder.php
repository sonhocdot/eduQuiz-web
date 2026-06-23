<?php

namespace Database\Seeders;

use App\Models\Demo;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DemoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Demo::create([
            'title' => 'Trắc nghiệm Lịch sử Việt Nam',
            'description' => 'Kiểm tra kiến thức về các triều đại lịch sử',
            'total_questions' => 10
        ]);

        Demo::create([
            'title' => 'Đố vui Ẩm thực Bắc Bộ',
            'description' => 'Khám phá nguồn gốc các món ăn truyền thống',
            'total_questions' => 15
        ]);
    }
}
