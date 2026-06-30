<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\DemoController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\Admin\DashboardController;
use App\Http\Controllers\Api\Admin\StudentManagementController;
use App\Http\Controllers\Api\Admin\CategoryController;
use App\Http\Controllers\Api\Admin\TeacherAssignmentController;
use App\Http\Controllers\Api\Admin\TeacherManagementController;
use App\Http\Controllers\Api\Admin\QuestionController;
use App\Http\Controllers\Api\Admin\PracticeController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);

    // Ví dụ một Route kiểm tra xem Token có hợp lệ và lấy thông tin User hiện tại
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
});
Route::middleware('auth:sanctum')->prefix('admin')->group(function () {
    // Quản lý học viên
    Route::get('/students', [StudentManagementController::class, 'index']);
    Route::post('/students', [StudentManagementController::class, 'store']);
    Route::put('/students/{id}', [StudentManagementController::class, 'update']);
    Route::put('/students/{id}/toggle-status', [StudentManagementController::class, 'toggleStatus']);
    Route::put('/students/{id}/reset-password', [StudentManagementController::class, 'resetPassword']);

    // Danh mục môn học đa cấp
    Route::get('/categories/tree', [CategoryController::class, 'getCategoryTree']);
    // --- KHỐI QUẢN LÝ MÔN HỌC (SUBJECTS) ---
    Route::post('/subjects', [CategoryController::class, 'storeSubject']);          // Thêm môn
    Route::put('/subjects/{id}', [CategoryController::class, 'updateSubject']);      // Sửa môn (Mới thêm)
    // Quản lý ngân hàng câu hỏi
    Route::get('/questions', [QuestionController::class, 'index']);
    Route::post('/questions', [QuestionController::class, 'store']);
    Route::put('/questions/{id}', [QuestionController::class, 'updateWithUpsert']);
    Route::delete('/questions/{id}', [QuestionController::class, 'destroy']);
    // --- KHỐI QUẢN LÝ CHƯƠNG/BÀI (CHAPTERS) ---
    Route::post('/chapters', [CategoryController::class, 'storeChapter']);
    Route::put('/chapters/{id}', [CategoryController::class, 'updateChapter']);
    Route::delete('/chapters/{id}', [CategoryController::class, 'destroyChapter']);
    // Khối quản lý giảng viên 
    Route::get('/teachers', [TeacherManagementController::class, 'index']);
    Route::post('/teachers', [TeacherManagementController::class, 'store']);
    Route::put('/teachers/{id}', [TeacherManagementController::class, 'update']);
    Route::put('/teachers/{id}/toggle-status', [TeacherManagementController::class, 'toggleStatus']);
    // Route phân công phụ trách môn học
    Route::post('/teachers/{id}/assign-subjects', [TeacherAssignmentController::class, 'assignSubjects']);
    Route::post('/practice/create-by-chapter', [PracticeController::class, 'createChapterPracticeQuiz']);
});
