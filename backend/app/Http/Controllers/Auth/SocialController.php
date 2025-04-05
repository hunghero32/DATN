<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Laravel\Socialite\Facades\Socialite;
use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Str;
class SocialController extends Controller
{
    public function redirect()
    {
        return Socialite::driver('google')->redirect();
    }
    public function callback(Request $request)
    {
        // Get user info from Google
        $socialUser = Socialite::driver('google')->user();
    
        // Find or create user
        $user = User::firstOrCreate(
            ['email' => $socialUser->getEmail()],
            [
                'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                'password' => bcrypt(Str::random(60)),
            ]
        );
    
        // Create auth token
        $token = $user->createToken('authToken')->plainTextToken;
    
        // Redirect to frontend with token and user info
        return redirect("http://localhost:3000/auth/oauth-success?token={$token}&user=" . urlencode(json_encode($user)));
    }
    
    

    
}
