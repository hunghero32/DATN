<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Category;

class CategoryController extends Controller
{
    public function index(){
        $listCategory =Category::all();
        return view('admin.pages.categories.index')->with(
            [
                'listCategory'=> $listCategory
            ]);
    }
    public function create(){
        return view('admin.pages.categories.create');
    }
    public function store(Request $rep){
        $data = [
            'name'=>$rep->name,
            'description'=>$rep->description
        ];
        Category::create($data);
        return redirect()->route('admin.categories.index');


    }
    public function edit($id){
        $category = Category::find($id);
        return view('admin.pages.categories.edit')->with([
            'category'=>$category

        ]);

    }
    public function update($id,Request $rep ){
        $category = Category::find($id);
        $data = [
            'name'=>$rep->name,
            'description'=>$rep->description
        ];
        $category->update($data);
        return redirect()->route('admin.categories.index');

    }
    public function delete($id){
        $category = Category::find($id);
        $category->delete();
        return redirect()->route('admin.categories.index')->with([
            'succers'=>'Ban da xoa thanh cong'
        ]);

    }
    


}
