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
        return redirect("https://quickcare.asia/auth/oauth-success?token={$token}&user=" . urlencode(json_encode($user)));
    }
    public function redirectToGitHub()
    {
        return Socialite::driver('github')->redirect();
    }

    public function handleGitHubCallback(Request $request)
    {
        try {
            $socialUser = Socialite::driver('github')->user();
            
            // Find or create user
            $user = User::firstOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'name' => $socialUser->getName() ?? $socialUser->getNickname(),
                    'password' => bcrypt(Str::random(60)),
                    'social_id' => $socialUser->getId(),
                    'social_provider' => 'github'
                ]
            );
    
            // Create auth token
            $token = $user->createToken('authToken')->plainTextToken;
    
            // Redirect to frontend with token and user info
            return redirect("https://quickcare.asia/auth/oauth-success?token={$token}&user=" . urlencode(json_encode($user)));
        } catch (\Exception $e) {
            return redirect("https://quickcare.asia/login?error=Authentication failed");
        }
    }

    public function redirectToFacebook()
    {
        return Socialite::driver('facebook')->redirect();
    }

    // Handle Facebook Callback
    public function handleFacebookCallback(Request $request)
    {
        try {
            $socialUser = Socialite::driver('facebook')->user();
            
            // Find or create user
            $user = User::firstOrCreate(
                ['email' => $socialUser->getEmail()],
                [
                    'name' => $socialUser->getName(),
                    'password' => bcrypt(Str::random(60)),
                    'social_id' => $socialUser->getId(),
                    'social_provider' => 'facebook'
                ]
            );
    
            // Create auth token
            $token = $user->createToken('authToken')->plainTextToken;
    
            // Redirect to frontend with token and user info
            return redirect("https://quickcare.asia/auth/oauth-success?token={$token}&user=" . urlencode(json_encode($user)));
        } catch (\Exception $e) {
            return redirect("https://quickcare.asia/login?error=Authentication failed");
        }
    }
    

    
}
