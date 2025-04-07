<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Specialty;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specialties = Specialty::orderBy('id','DESC')->get();
        return response()->json($specialties, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSpecialtyRequest $request)
    {
        $rules = [
            'name' => 'required|max:255',
            'description' => 'required|string',
            'icon' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ];
    
        $messages = [
            'name.required' => 'Tên chuyên khoa là bắt buộc.',
            'name.max' => 'Tên chuyên khoa không được vượt quá 255 ký tự.',
            'description.required' => 'Mô tả là bắt buộc.',
            'description.string' => 'Mô tả phải là chuỗi ký tự.',
            'icon.image' => 'Biểu tượng phải là một hình ảnh.',
            'icon.mimes' => 'Biểu tượng phải có định dạng jpg, jpeg, png, hoặc gif.',
            'icon.max' => 'Biểu tượng không được vượt quá 2MB.',
            'image.image' => 'Hình ảnh phải là một hình ảnh.',
            'image.mimes' => 'Hình ảnh phải có định dạng jpg, jpeg, png, hoặc gif.',
            'image.max' => 'Hình ảnh không được vượt quá 2MB.',
        ];
    
        $validator = Validator::make($request->all(), $rules, $messages);
    
        if ($validator->fails()) {
            return redirect()->back()->withErrors($validator)->withInput();
        }
    
        $data = $request->only(['name', 'description']); 
        $data = $request->validated();
        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('uploads', 'public');
        }
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('uploads', 'public');
        }
        $specialty = Specialty::create($data);
        return response()->json($specialty, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Specialty $specialty)
    {
        return response()->json($specialty, 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSpecialtyRequest $request, Specialty $specialty)
    {
        $data = $request->validated();
        if ($request->hasFile('icon')) {
            if ($specialty->icon) {
                Storage::delete('public/' . $specialty->icon);
            }
            $data['icon'] = $request->file('icon')->store('uploads', 'public');
        }
        if ($request->hasFile('image')) {
            if ($specialty->image) {
                Storage::delete('public/' . $specialty->image);
            }
            $data['image'] = $request->file('image')->store('uploads', 'public');
        }
        $specialty->update($data);
        return response()->json(['message' => 'Chuyên khoa được cập nhật thành công.', 'data' => $specialty], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specialty $specialty)
    {
        $specialty->delete();
        return response()->json(['message' => 'Chuyên khoa được xóa thành công.'], 200);
    }
}
