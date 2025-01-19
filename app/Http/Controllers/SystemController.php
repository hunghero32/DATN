<?php

namespace App\Http\Controllers;

use App\Models\System;
use App\Http\Requests\StoreSystemRequest;
use App\Http\Requests\UpdateSystemRequest;
use Illuminate\Support\Facades\Storage;

class SystemController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $system = System::first();
        if ($system) {
            return redirect()->route('system.edit', $system)->with('warning', 'Hệ thống đã được cấu hình. Vui lòng chỉnh sửa.');
        }
        return view('admin.system.create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSystemRequest $request)
    {
        $system = System::first();
        if ($system) {
            return redirect()->route('system.edit', $system)->with('warning', 'Hệ thống đã được cấu hình. Vui lòng chỉnh sửa.');
        }

        $data = $request->validated();

        if ($request->hasFile('site_logo')) {
            $data['site_logo'] = $request->file('site_logo')->store('uploads', 'public');
        }
        if ($request->hasFile('site_favicon')) {
            $data['site_favicon'] = $request->file('site_favicon')->store('uploads', 'public');
        }

        System::create($data);

        return redirect()->route('system.index')->with('success', 'Cấu hình hệ thống thành công.');
    }

    /**
     * Display the specified resource.
     */
    public function show(System $system)
    {
        $system = System::first();
        return view('layouts.app', compact('system'));
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(System $system)
    {
        $system = System::first();
        return view('admin.system.edit', compact('system'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSystemRequest $request, System $system)
    {
        $system = System::first();
        $data=$request->validated();
        if ($request->hasFile('site_logo')) {
            if ($system->site_logo) {
                Storage::delete('public/' . $system->site_logo);
            }
            $data['site_logo'] = $request->file('site_logo')->store('uploads', 'public');
        }
        if ($request->hasFile('site_favicon')) {
            if ($system->site_favicon) {
                Storage::delete('public/' . $system->site_favicon);
            }
            $data['site_favicon'] = $request->file('site_favicon')->store('uploads', 'public');
        }
        $system->update($data);
        return redirect()->route('system.edit')->with('success', 'Cập nhật thành công.');
}

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(System $system)
    {
        //
    }
}
