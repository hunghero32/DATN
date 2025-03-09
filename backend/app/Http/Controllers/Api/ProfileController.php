<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Hash;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Log;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(Request $request): JsonResponse
    {
        $user = $request->user();
    
        if (!$user) {
            return response()->json(['message' => 'Không tìm thấy thông tin người dùng.'], 404);
        }
    
        return response()->json(['user' => $user]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request): JsonResponse
    {
        $user = $request->user();
        $user->fill($request->validated());
    
        if ($user->isDirty('email')) {
            $user->email_verified_at = null;
        }
    
        if ($request->filled('password')) {
            if ($request->filled('currentPassword')) {
                Log::info("Mật khẩu nhận từ request:", [$request->currentPassword]);
                Log::info("Mật khẩu hash trong database:", [$user->password]);
        
                if (!Hash::check($request->currentPassword, $user->password)) {
                    return response()->json(['message' => 'Mật khẩu hiện tại không chính xác.'], 422);
                }
            } else {
                return response()->json(['message' => 'Bạn cần nhập mật khẩu hiện tại để đổi mật khẩu.'], 422);
            }
        
            $user->password = bcrypt($request->input('password'));
        }
        
        
        
        
    
        $user->save();
    
        return response()->json([
            'message' => 'Cập nhật thành công.',
            'user' => $user
        ]);
    }
    

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): JsonResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);
        $user = $request->user();
        Auth::logout();
        $user->delete();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return response()->json([
            'message' => 'Tài khoản đã bị xóa.'
        ]);
    }
}
