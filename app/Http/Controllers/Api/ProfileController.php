<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Http\JsonResponse;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function show(Request $request): JsonResponse
    {
        return response()->json([
            'user' => $request->user()
        ]);
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
        $user->save();
        return response()->json([
            'message' => 'Cập nhật thông tin thành công.',
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
    public function updateFirebaseToken(Request $request): JsonResponse
{
    $request->validate(['firebase_token' => 'required|string']);

    $user = $request->user();
    $user->update(['firebase_token' => $request->firebase_token]);

    return response()->json([
        'message' => 'Firebase token cập nhật thành công.',
        'user' => $user
    ]);
}

    public function getFirebaseToken(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'firebase_token' => $user->firebase_token
        ]);
    }
    public function getUserInfo(Request $request): JsonResponse
    {
        $user = $request->user();
        return response()->json([
            'user' => $user
        ]);
    }
    public function updateUserInfo(Request $request): JsonResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'phone' => 'required|string|max:15',
            'address' => 'nullable|string|max:255',
        ]);

        $user = $request->user();
        $user->update($request->only('name', 'email', 'phone', 'address'));

        return response()->json([
            'message' => 'Thông tin người dùng đã được cập nhật.',
            'user' => $user
        ]);
    }
}
