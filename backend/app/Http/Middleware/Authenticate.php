<?php

namespace App\Http\Middleware;

use Illuminate\Auth\Middleware\Authenticate as Middleware;
use Illuminate\Http\Request;

class Authenticate extends Middleware
{
    /**
     * Get the path the user should be redirected to when they are not authenticated.
     */
    protected function redirectTo(Request $request): ?string
    {
        // return $request->expectsJson() ? null : route('login');
        // Nếu là API request (thường bắt đầu bằng /api), không redirect mà trả về null (để trả về JSON lỗi 401)
        if ($request->is('api/*')) {
            return null;
        }

        // Nếu là trang admin thì redirect về admin/login
        if ($request->is('admin') || $request->is('admin/*')) {
            return route('admin.login');
        }
        return route('login');
    }
}
