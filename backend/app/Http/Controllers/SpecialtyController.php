<?php

namespace App\Http\Controllers;

use App\Models\Specialty;
use App\Http\Requests\StoreSpecialtyRequest;
use App\Http\Requests\UpdateSpecialtyRequest;
use Illuminate\Support\Facades\Storage;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specialties = Specialty::paginate(5);
        return view('admin.specialties.index', compact('specialties'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return view('admin.specialties.create');
    }

    /**
     * Store a newly created resource in storage.
     */
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
        return redirect()->route('specialties.index')->with('success', 'Chuyên khoa được tạo thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Specialty $specialty)
    {
        return view('admin.specialties.show', compact('specialty'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Specialty $specialty)
    {
        return view('admin.specialties.edit', compact('specialty'));
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
        return redirect()->route('specialties.index')->with('success', 'Chuyên khoa được cập nhật thành công.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Specialty $specialty)
    {
        $specialty->delete();
        return redirect()->route('specialties.index')->with('success', 'Chuyên khoa được xóa thành công.');
    }
}
