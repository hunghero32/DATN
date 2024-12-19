<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthenticatedSessionController extends Controller
{
    /**
     * Handle an incoming authentication request.
     */
    public function store(LoginRequest $request)
    {
        $request->authenticate();
        $role = Auth::user()->role;
        return response()->json([
            'message' => 'Login successful',
            'role' => $role,
            'access_token' => $this->createToken(),
            'user' => Auth::user(),
        ], 200);
    }
    /**
     * Destroy an authenticated session.
     */
    public function destroy(Request $request)
    {
        Auth::user()->tokens->each(function ($token) {
            $token->delete();
        });
        return response()->json(['message' => 'Logged out successfully'], 200);
    }
    private function createToken()
    {
        return Auth::user()->createToken(Auth::user()->name)->plainTextToken;
    }
}
