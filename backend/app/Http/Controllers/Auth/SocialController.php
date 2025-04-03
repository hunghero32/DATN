<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\User;

class SocialController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->stateless()->redirect();
    }
    
    public function callback()
    {
        $socialUser = Socialite::driver('google')->stateless()->user();
    
        $user = User::firstOrCreate(
            ['email' => $socialUser->getEmail()],
            [
                'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                'password' => bcrypt(uniqid()),
            ]
        );
    
        $token = $user->createToken('authToken')->plainTextToken;
    
        return redirect("http://localhost:3000/oauth-success?token=$token&user=" . urlencode(json_encode($user)));
    }
    
}
