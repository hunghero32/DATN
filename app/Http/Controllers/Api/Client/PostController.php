<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function detailPost($slug, $id) {
        // Tìm bài viết theo ID và Slug
        $post = Post::with(['category', 'user'])
            ->where('status', 'published')
            ->where('isDeleted', 0)
            ->where('id', $id)
            ->where('slug', $slug)
            ->first();

        if (!$post) {
            return response()->json(['message' => 'Post not found'], 404);
        }

        // Tăng số lượt xem
        $post->increment('views');

        return response()->json($post);
    }

}
