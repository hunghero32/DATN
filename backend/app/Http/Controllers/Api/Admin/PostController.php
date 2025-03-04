<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;

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

    /**
     * Thêm mới bài viết.
     */
    public function store(StorePostRequest $request)
    {
        $validatedData = $request->validated();
        $post = Post::create($validatedData);

        return response()->json([
            'post' => $post,
            'message' => 'Thêm mới bài viết thành công.'
        ], 201);
    }

    /**
     * Cập nhật bài viết.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        $validatedData = $request->validated();
        $post->update($validatedData);

        return response()->json([
            'post' => $post,
            'message' => 'Cập nhật bài viết thành công.'
        ], 200);
    }

    /**
     * Xóa mềm bài viết.
     */
    public function destroy(Post $post)
    {
        $post->delete(); // Soft delete

        return response()->json([
            'message' => 'Xóa bài viết thành công.'
        ], 200);
    }
}
