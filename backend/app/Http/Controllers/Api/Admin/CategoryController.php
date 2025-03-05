<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;

class CategoryController extends Controller
{
    /**
     * Hiển thị danh sách các danh mục (có phân trang).
     */
    public function index()
    {
        $categories = Category::paginate(5);
        return response()->json($categories, 200);
    }

    /**
     * Lưu danh mục mới vào cơ sở dữ liệu.
     */
    public function store(StoreCategoryRequest $request)
    {
        $data = $request->validated();
        $category = Category::create($data);
        return response()->json($category, 201);
    }

    /**
     * Hiển thị một danh mục cụ thể.
     */
    public function show(Category $category)
    {
        return response()->json($category, 200);
    }

    /**
     * Cập nhật danh mục.
     */
    public function update(UpdateCategoryRequest $request, Category $category)
    {
        $data = $request->validated();
        $category->update($data);
        return response()->json(['message' => 'Cập nhật thành công.', 'data' => $category], 200);
    }

    /**
     * Xóa danh mục.
     */
    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Xóa thành công.'], 200);
    }
}

