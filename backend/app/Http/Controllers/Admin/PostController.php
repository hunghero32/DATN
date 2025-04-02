<?php

namespace App\Http\Controllers\Admin;
use Illuminate\Support\Str;

use Illuminate\Support\Facades\Storage;
use App\Http\Requests\UpdatePostRequest;

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
        // Lấy dữ liệu đã validate
        $data = $rep->validated();

        // Xử lý upload ảnh (nếu có)
        if ($rep->hasFile('image')) {
            $filePath = $rep->file('image')->store('uploads', 'public');
            $data['image'] = $filePath;
        }

        // Kiểm tra nếu không có published_at, gán mặc định là ngày hiện tại
        if (!isset($data['published_at']) || empty($data['published_at'])) {
            $data['published_at'] = now();
        }
        // Kiểm tra danh mục và người dùng
        if (!isset($data['category_id']) || !isset($data['user_id'])) {
            return redirect()->back()->withErrors([
                'category_id' => 'Danh mục là bắt buộc.',
                'user_id' => 'Người dùng là bắt buộc.'
            ])->withInput();
        }

        // Tạo bài viết
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
    public function update(Request $request, $id)
    {
        // Tìm bài viết, nếu không có thì trả về 404
        $post = Post::findOrFail($id);

        // Lấy dữ liệu đầu vào
        $data = $request->all();

        // Nếu có ảnh mới, xử lý lưu ảnh và xóa ảnh cũ
        if ($request->hasFile('image')) {
            // Xóa ảnh cũ nếu có
            if ($post->image) {
                Storage::disk('public')->delete($post->image);
            }

            // Lưu ảnh mới vào storage/public/uploads
            $data['image'] = $request->file('image')->store('uploads', 'public');
        }

        if (empty($data['slug'])) {
            $data['slug'] = Str::slug($data['title']); // Tạo slug từ title
        }
        // Cập nhật bài viết
        $post->update($data);

        // Trả về trang danh sách bài viết với thông báo thành công
        return redirect()->route('admin.posts.index')->with('success', 'Bài viết đã được cập nhật thành công.');
    }


    // Tìm kiếm danh mục
    public function searchCategory(Request $request)
    {
        $query = $request->get('q');
        $categories = Category::where('name', 'LIKE', "%$query%")->get();
        return response()->json($categories);
    }

    // Tìm kiếm tác giả
    public function searchAuthor(Request $request)
    {
        $query = $request->get('q');
        $users = User::where('name', 'LIKE', "%$query%")->get();
        return response()->json($users);
    }
}
