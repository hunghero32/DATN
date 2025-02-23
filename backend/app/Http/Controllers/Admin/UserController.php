<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function index()
    {
        $user = User::all();
        return view('admin.pages.users.index')->with([
            'user' => $user
        ]);
    }

    public function create()
    {
        $role = [
            'admin' => 'Quản trị viên',
            'doctor' => 'Bác sĩ',
            'guest' => 'Bệnh nhân'
        ];

        $user = new User(); // Tạo user rỗng để tránh lỗi khi thêm mới

        return view('admin.pages.users.create', compact('user', 'role'));
    }

    public function store(Request $rep)
    {
        $data = [
            'name' => $rep->name,
            'email' => $rep->email,
            'phone' => $rep->phone,
            'password' => $rep->password,
            'role' => $rep->role,

        ];
        User::create($data);
        return redirect()->route('admin.users.index');
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
