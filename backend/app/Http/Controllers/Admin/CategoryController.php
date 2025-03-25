<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreCategoryRequest;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(Request $request)
    {
        // Lấy từ khóa tìm kiếm nếu có
        $search = $request->input('search');

        // Truy vấn danh mục, áp dụng tìm kiếm nếu có
        $query = Category::query();
        if (!empty($search)) {
            $query->where('name', 'like', "%{$search}%");
        }

        // Phân trang với 10 danh mục mỗi trang, giữ tham số tìm kiếm khi chuyển trang
        $listCategory = $query->paginate(10)->appends(['search' => $search]);

        // Trả về view với danh sách danh mục
        return view('admin.pages.categories.index', compact('listCategory', 'search'));
    }

    public function create()
    {
        $categories = Category::whereNull('parent_id')->get(); // Lấy các danh mục cha (parent_id = NULL)
        return view('admin.pages.categories.create', compact('categories'));
    }


    public function store(StoreCategoryRequest $request)
    {
        // Lấy dữ liệu đã được validate
        $data = $request->validated();

        // Tạo danh mục mới
        Category::create($data);

        // Chuyển hướng về trang danh sách với thông báo thành công
        return redirect()->route('admin.categories.index')->with('success', 'Danh mục đã được tạo thành công.');
    }

    public function edit($id)
    {
        $category = Category::find($id);
        return view('admin.pages.categories.edit')->with([
            'category' => $category

        ]);
    }
    public function update($id, Request $rep)
    {
        $category = Category::find($id);
        $data = [
            'name' => $rep->name,
            'description' => $rep->description
        ];
        $category->update($data);
        return redirect()->route('admin.categories.index');
    }
    public function delete($id)
    {
        $category = Category::find($id);
        $category->delete();
        return redirect()->route('admin.categories.index')->with([
            'succers' => 'Ban da xoa thanh cong'
        ]);
    }
}
