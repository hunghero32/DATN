<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Post;
use App\Models\Category;
use App\Models\User;

class PostController  extends Controller
{
    public function index()
    {
        $post = Post::with('category', 'user')->get();

        return view('admin.pages.posts.index')->with([
            'post' => $post

        ]);
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
    public function store(Request $rep)
    {
        //dd($rep->all());
        $data = [
            'title' => $rep->title,
            'content' => $rep->content,
            'category_id' => $rep->category_id,
            'user_id' => $rep->user_id,
            'status' => $rep->status,
            'slug' => $rep->slug,



        ];
        Post::create($data);
        return redirect()->route('admin.posts.index');
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
