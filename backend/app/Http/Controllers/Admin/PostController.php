<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePostRequest;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;


class PostController  extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query()->with('category', 'user');

        // Tìm kiếm theo tiêu đề, nội dung, tác giả
        if ($request->filled('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                    ->orWhere('content', 'like', "%$search%")
                    ->orWhereHas('user', function ($q) use ($search) {
                        $q->where('name', 'like', "%$search%");
                    });
            });
        }

        // Lọc theo danh mục
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }

        // Lọc theo trạng thái
        if ($request->filled('status')) {
            $query->where('status', $request->status);
        }

        // Lọc theo ngày xuất bản
        if ($request->filled('published_at')) {
            $query->whereDate('published_at', $request->published_at);
        }

        // Phân trang (10 bài viết mỗi trang)
        $posts = $query->paginate(10);

        // Lấy danh sách danh mục để hiển thị bộ lọc
        $categories = Category::all();

        return view('admin.pages.posts.index', compact('posts', 'categories'));
    }

    public function create()
    {
        $categories = Category::all();
        $users = User::all();
        $statuss = ['draft' => 'Nháp', 'published' => 'Đã xuất bản', 'archived' => 'Lưu trữ'];

        return view('admin.pages.posts.create')->with([
            'categories' => $categories,
            'users' => $users,
            'statuss' => $statuss


        ]);
    }
    public function store(StorePostRequest $rep)
    {
        $data = $rep->validated(); // Lấy dữ liệu đã validate

        $filePath = null;
        if ($rep->hasFile('file')) {
            $filePath = $rep->file('file')->store('uploads', 'public');
            $data= $filePath;
        }

        Post::create($data);

        return redirect()->route('admin.posts.index')->with('success', 'Bài viết đã được tạo thành công.');
    }

    public function delete($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return redirect()->route('admin.posts.index')->with('error', 'Bài viết không tồn tại.');
        }

        $post->delete(); // Soft delete



        return redirect()->route('admin.posts.index')->with('danger', 'Bài viết đã được xóa.');
    }
    public function edit($id)
    {

        $categories = Category::all();
        $users = User::all();
        $statuss = ['draft' => 'Nháp', 'published' => 'Đã xuất bản', 'archived' => 'Lưu trữ'];
        $post = Post::find($id);
        return view('admin.pages.posts.edit')->with([
            'post' => $post,
            'categories' => $categories,
            'users' => $users,
            'statuss' => $statuss


        ]);
    }
    public function update($id, Request $rep)
    {

        $post = Post::find($id);
        $data = [
            'title' => $rep->title,
            'content' => $rep->content,
            'category_id' => $rep->category_id,
            'user_id' => $rep->user_id,
            'status' => $rep->status,
            'slug' => $rep->slug,



        ];
        $post->update($data);
        return redirect()->route('admin.posts.index');
    }
}
