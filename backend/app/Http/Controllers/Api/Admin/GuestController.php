<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Guest;

class GuestController extends Controller
{
    /**
     * Hiển thị danh sách khách.
     */
    public function index()
    {
        $guests = Guest::with('user')->paginate(10);
        return response()->json($guests, 200);
    }
    /**
     * Hiển thị thông tin khách cụ thể.
     */
    public function show(Guest $guest)
    {
        return response()->json($guest->load('user'), 200);
    }
}
