<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreUserRequest;
use Illuminate\Support\Facades\Hash;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->get('per_page', 10);
        $query = User::query();

        // 🔍 Tìm kiếm theo tên, email, số điện thoại
        if ($request->has('search') && $request->search != '') {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'LIKE', "%$search%")
                    ->orWhere('email', 'LIKE', "%$search%")
                    ->orWhere('phone', 'LIKE', "%$search%");
            });
        }

        // 🏷 Bộ lọc theo Role
        if ($request->has('role') && $request->role != '') {
            $query->where('role', $request->role);
        }

        // 📆 Bộ lọc theo ngày tạo tài khoản
        if ($request->has('created_at') && $request->created_at != '') {
            $query->whereDate('created_at', $request->created_at);
        }

        $users = $query->orderBy('created_at', 'desc')->paginate($perPage);
        $users->appends($request->all()); // Giữ nguyên bộ lọc khi phân trang

        $role = [
            '' => 'Tất cả vai trò',
            'admin' => 'Quản trị viên',
            'doctor' => 'Bác sĩ',
            'guest' => 'Bệnh nhân'
        ];

        return view('admin.pages.users.index', compact('users', 'role'));
    }



    public function create()
    {
        $roled = [
            'admin' => 'Quản trị viên',
            'doctor' => 'Bác sĩ',
            'guest' => 'Bệnh nhân'
        ];

        $user = new User(); // Tạo user rỗng để tránh lỗi khi thêm mới

        return view('admin.pages.users.create', compact('user', 'roled'));
    }




    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        $data['password'] = Hash::make($request->password); // Mã hóa mật khẩu

        User::create($data);

        return redirect()->route('admin.users.index')->with('success', 'Người dùng đã được thêm thành công!');
    }


    public function delete($id)
    {
        $user = User::find($id);
        $user->delete();
        return redirect()->route('admin.users.index');
    }
    public function edit($id)
    {
        $user = User::find($id);
        $role = [
            'admin' => 'Quản trị viên',
            'doctor' => 'Bác sĩ',
            'guest' => 'Bệnh nhân'
        ];

        return view('admin.pages.users.edit')->with([
            'user' => $user,
            'role' => $role

        ]);
    }

    public function update($id, Request $rep)
    {
        $user = User::find($id);
        $data = [
            'name' => $rep->name,
            'email' => $rep->email,
            'phone' => $rep->phone,
            'password' => $rep->password,
            'role' => $rep->role,

        ];
        $user->update($data);
        return redirect()->route('admin.users.index');
    }
}
