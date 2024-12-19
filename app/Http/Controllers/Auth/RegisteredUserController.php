<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use App\Http\Requests\Auth\RegisterRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class RegisteredUserController extends Controller
{
    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(RegisterRequest $request)
    {
        $request->validated();
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'social_id' => $request->social_id,
            'social_provider' => $request->social_provider,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? 'guest',
            'level' => $request->level ?? 1,
        ]);

        event(new Registered($user));

        Auth::login($user);

        return response()->json([
            'message' => 'Register successful',
            'user' => $user,
        ], 201);
    }
}
