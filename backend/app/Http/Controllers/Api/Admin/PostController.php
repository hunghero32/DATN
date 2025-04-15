<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;

class PostController extends Controller
{
    /**
     * Lấy danh sách bài viết.
     */
    public function index()
    {
        $posts = Post::with(['category', 'user'])->paginate(5);
        return response()->json($posts, 200);
    }
}
