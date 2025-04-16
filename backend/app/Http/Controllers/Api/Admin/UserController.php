<?php

namespace App\Http\Controllers\Api\Admin;

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
}
