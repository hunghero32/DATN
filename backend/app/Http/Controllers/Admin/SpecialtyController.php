<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Specialty;
use Illuminate\Http\Request;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;
use Illuminate\Support\Facades\Storage;

class SpecialtyController extends Controller
{
    public function index(Request $request)
    {
        $query = Specialty::where('isDeleted', 0);
    
        if ($request->has('search') && !empty($request->search)) {
            $searchTerm = '%' . $request->search . '%';
            $query->where('name', 'LIKE', $searchTerm);
        }
        $query->orderBy('created_at', 'desc');
        $specialties = $query->paginate(10)->withQueryString(); //  query  phân trang
    
        return view('admin.pages.specialties.index', compact('specialties'));
    }
    public function show($id)
{
    $specialty = Specialty::where('id', $id)->where('isDeleted', 0)->firstOrFail();
    return view('admin.pages.specialties.show', compact('specialty'));
}


    public function create()
    {
        return view('admin.pages.specialties.create');
    }

    public function store(StoreSpecialtyRequest $request)
    {
        $data = $request->validated();
        if ($request->hasFile('icon')) {
            $data['icon'] = $request->file('icon')->store('uploads', 'public');
        }
        if ($request->hasFile('image')) {
            $data['image'] = $request->file('image')->store('uploads', 'public');
        }
        Specialty::create($data);
        return redirect()->route('admin.specialties.index')->with('success', 'Chuyên khoa được tạo thành công.');
    }

    public function edit($id)
    {
        $specialty = Specialty::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        return view('admin.pages.specialties.edit', compact('specialty'));
    }

    public function update(UpdateSpecialtyRequest $request, $id)
    {
        $specialty = Specialty::findOrFail($id);
        
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
    
        return redirect()->route('admin.specialties.index')->with('success', 'Cập nhật thành công');
    }
    public function delete($id)
    {
        $specialty = Specialty::where('id', $id)->where('isDeleted', 0)->firstOrFail();
        $specialty->update(['isDeleted' => 1]);

        return redirect()->route('admin.specialties.index')->with('success', 'Chuyên khoa đã bị xóa!');
    }
}