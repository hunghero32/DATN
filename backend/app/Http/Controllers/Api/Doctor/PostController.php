<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Http\Requests\StorePostRequest;
use App\Http\Requests\UpdatePostRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;
use Illuminate\Support\Facades\Storage;

class PostController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $posts = Post::with(['category:id,name'])
            ->where('isDeleted', 0)
            ->where('user_id', auth()->id())
            ->search($request->search)
            ->filter($request->only(['category_id', 'status', 'published_at']))
            ->latest('published_at')
            ->select(['id', 'category_id','image', 'title', 'views', 'status', 'published_at'])
            ->latest('updated_at')->paginate(10);
        return response()->json([
            'message' => 'Lấy danh sách bài viết thành công.',
            'data' => $posts
        ], 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StorePostRequest $request)
    {
        $data = $request->validated();
        $data['user_id'] = auth()->id();
        $data['slug'] = $this->generateUniqueSlug($data['title']);
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('posts', 'public');
        }
        if ($data['status'] === 'published') {
            $data['published_at'] = Carbon::now();
        }
        $post = Post::create($data);
        return response()->json([
            'message' => 'Tạo bài viết thành công.',
            'data' => $post->only(['id', 'image','title', 'slug', 'status', 'published_at'])
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Bạn không có quyền xem bài viết này.'], 403);
        }
        $post->load(['category:id,name']);
        return response()->json([
            'message' => 'Lấy bài viết thành công.',
            'data' => $post->only([
                'id','image', 'title', 'slug', 'content', 'views', 'status', 'published_at', 'category'
            ])
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdatePostRequest $request, Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa bài viết này.'], 403);
        }
        $data = $request->validated();
        unset($data['user_id']);
        // Nếu title thay đổi, tạo lại slug
        if (isset($data['title']) && $data['title'] !== $post->title) {
            $data['slug'] = $this->generateUniqueSlug($data['title']);
        }
        if ($request->hasFile('image')) {
            if (!empty($post->image)) {
                Storage::delete('public/' . $post->image);
            }
            $data['image'] = $request->file('image')->store('posts', 'public');
        }
        $post->update($data);
        $post->load(['category:id,name']);
        return response()->json([
            'message' => 'Cập nhật bài viết thành công.',
            'data' => $post->only(['id', ,'image','title', 'slug','content', 'status', 'published_at', 'category'])
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Post $post)
    {
        if ($post->user_id !== auth()->id()) {
            return response()->json(['message' => 'Không có quyền xóa bài viết này.'], 403);
        }
        $post->delete();
        return response()->json([
            'message' => 'Xóa bài viết thành công.'
        ], 200);
    }
    private function generateUniqueSlug($title)
    {
        $slug = Str::slug($title);
        $originalSlug = $slug;
        $count = 1;
        // Lấy danh sách slug và so sánh trùng khớp từ database
        $existingSlugs = DB::table('posts')
            ->where('slug', 'LIKE', "{$slug}%")
            ->pluck('slug')
            ->toArray();

        while (in_array($slug, $existingSlugs)) {
            $slug = $originalSlug . '-' . $count;
            $count++;
        }
        return $slug;
    }
}
