<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    /**
     * API Đăng nhập chung xử lý phân quyền
     */
    public function login(Request $request)
    {
        // 1. Validate dữ liệu đầu vào từ React gửi lên
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:6',
            'login_type' => 'required|in:client,backoffice' // Nhận diện xem đang đăng nhập ở trang nào
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Kiểm tra tài khoản tồn tại trong DB
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => 'Tài khoản hoặc mật khẩu không chính xác.'
            ], 401);
        }

        // 3. XỬ LÝ ĐỊNH TUYẾN MIDDLEWARE / KIỂM TRA ROLE THEO YÊU CẦU ĐẶC TẢ
        
        // Nếu đăng nhập tại trang Khách hàng (Học viên) nhưng tài khoản là Admin/Teacher thì vẫn cho vào Client layout
        if ($request->login_type === 'backoffice') {
            // Nếu cố tình đăng nhập vào trang quản trị bằng tài khoản học viên (student) -> Chặn ngay
            if ($user->role === 'student') {
                return response()->json([
                    'success' => false,
                    'message' => 'Từ chối truy cập! Tài khoản của bạn không có quyền vào trang quản trị.'
                ], 403);
            }
        }

        // 4. Khởi tạo Token qua Laravel Sanctum (Lưu vào bảng personal_access_tokens)
        // Gán quyền hạn (abilities) trực tiếp vào Token để tăng tính bảo mật
        $token = $user->createToken('auth_token', [$user->role])->plainTextToken;

        // 5. Trả dữ liệu JSON về cho React hứng
        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role // Trả về role để React thực hiện logic `Maps()` đổi layout
            ]
        ], 200);
    }

    /**
     * API Đăng ký tài khoản mới (Chỉ dành cho Học viên)
     */
    public function register(Request $request)
    {
        // 1. Validate dữ liệu đầu vào từ React gửi lên
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:6|confirmed',
            
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'errors' => $validator->errors()
            ], 422);
        }

        // 2. Tạo tài khoản mới với role mặc định là "student"
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => 'student'
        ]);

        // 3. Khởi tạo Token cho tài khoản mới
        $token = $user->createToken('auth_token', ['student'])->plainTextToken;

        // 4. Trả dữ liệu JSON về cho React hứng
        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công.',
            'access_token' => $token,
            'token_type' => 'Bearer',
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'role' => $user->role
            ]
        ], 201);
    }

    /**
     * API Đăng xuất (Xóa token)
     */
    public function logout(Request $request)
    {
        // Xóa token hiện tại đang dùng để gọi API
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Đăng xuất thành công.'
        ], 200);
    }
}
