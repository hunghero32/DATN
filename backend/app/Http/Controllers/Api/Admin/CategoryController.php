<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

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
     * Hiển thị một danh mục cụ thể.
     */
    public function show(Category $category)
    {
        return response()->json($category, 200);
    }
}

