<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{
    /**
     * Lấy danh sách tất cả người dùng.
     */
    public function index()
    {
        $users = User::orderBy('id', 'desc')->get();
        return response()->json($users, 200);
    }

    /**
     * Thêm mới người dùng.
     */
    public function store(StoreUserRequest $request)
    {
        $validatedData = $request->validated();
        $validatedData['password'] = Hash::make($validatedData['password']); // Mã hóa mật khẩu

        $newUser = User::create($validatedData);

        return response()->json([
            'user' => $newUser,
            'message' => 'Thêm mới người dùng thành công.'
        ], 201);
    }

    /**
     * Cập nhật thông tin người dùng.
     */
    public function update(Request $request, User $user)
    {
         $validatedData = $request->all();

        if (isset($validatedData['password'])) {
            $validatedData['password'] = Hash::make($validatedData['password']); // Mã hóa mật khẩu mới nếu có
        }

        $user->update($validatedData);

        return response()->json([
            'user' => $user,
            'message' => 'Cập nhật thông tin thành công.'
        ], 200);
    }
    public function show($id){
        $data = User::find($id);
        return response()->json($data,200);
    }

    /**
     * Xóa người dùng.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json([
            'message' => 'Xóa người dùng thành công.'
        ], 200);
    }
}
