<?php

namespace App\Http\Controllers\Admin;

use App\Http\Requests\StoreSystemRequest;
use App\Http\Requests\UpdateSystemRequest;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\System;
use Illuminate\Support\Facades\Storage;

class SystemController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');
        $systems = System::when($search, function ($query, $search) {
            return $query->where('site_name', 'like', "%$search%");
        })->paginate(10);

        return view('admin.pages.system.index', compact('systems'));
    }


    public function store(StoreSystemRequest $request)
    {
        // Lấy dữ liệu đã được validate
        $data = $request->validated();

        // Xử lý upload file (logo & favicon)
        if ($request->hasFile('site_logo')) {
            $data['site_logo'] = $request->file('site_logo')->store('logos', 'public');
        }

        if ($request->hasFile('site_favicon')) {
            $data['site_favicon'] = $request->file('site_favicon')->store('favicons', 'public');
        }

        // Lưu dữ liệu vào database
        System::create($data);

        // Điều hướng về danh sách với thông báo thành công
        return redirect()->route('admin.systems.index')->with('success', 'Thêm cấu hình thành công!');
    }

    public function edit()
    {

        $system = System::first(); 

        return view('admin.pages.system.edit', compact('system'));
    }
    public function update(UpdateSystemRequest $request)
    {
        $system = System::first();
    
        // Xử lý upload logo nếu có
        if ($request->hasFile('site_logo')) {
            if ($system->site_logo) {
                Storage::disk('public')->delete($system->site_logo);
            }
            $system->site_logo = $request->file('site_logo')->store('logos', 'public');
        }
    
        // Xử lý upload favicon nếu có
        if ($request->hasFile('site_favicon')) {
            if ($system->site_favicon) {
                Storage::disk('public')->delete($system->site_favicon);
            }
            $system->site_favicon = $request->file('site_favicon')->store('favicons', 'public');
        }
    
        // Cập nhật các trường còn lại (trừ logo & favicon đã xử lý riêng)
        $system->update($request->except(['site_logo', 'site_favicon']));
    
        return redirect()->route('admin.systems.edit')->with('success', 'Cấu hình hệ thống đã được cập nhật thành công!');
    }
    
    public function editBanner(Request $request)
    {
        $system = System::first(); // Hoặc tìm bản ghi hệ thống tương ứng
        $banners = $system->banner ? json_decode($system->banner, true) : [];
        return view('admin.pages.system.editBanner', compact('system', 'banners'));
    }

    public function updateBanner(Request $request)
    {
        $request->validate([
            'banners' => 'nullable|array',
            'banners.*.image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'banners.*.title' => 'nullable|string|max:255',
        ]);
    
        $system = System::first();
        $existingBanners = json_decode($system->banner, true) ?? [];
    
        $submittedBanners = $request->banners ?? [];
    
        $banners = [];
    
        // Duyệt qua các dòng còn lại để cập nhật hoặc giữ ảnh
        foreach ($submittedBanners as $index => $banner) {
            $imageName = null;
            $oldImage = $existingBanners[$index]['image_url'] ?? null;
    
            if ($request->hasFile("banners.$index.image_url")) {
                // Xóa ảnh cũ nếu có
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
    
                $imageName = $banner['image_url']->store('banner_images', 'public');
            }
            elseif (!empty($banner['remove'])) {
                if ($oldImage && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
                $imageName = null;
            }
            else {
                $imageName = $oldImage;
            }
    
            $banners[] = [
                'title' => $banner['title'] ?? null,
                'image_url' => $imageName,
            ];
        }
    
        // Xử lý các dòng bị xóa hoàn toàn (không còn tồn tại trong request)
        foreach ($existingBanners as $index => $oldBanner) {
            if (!isset($submittedBanners[$index]) && isset($oldBanner['image_url'])) {
                if (Storage::disk('public')->exists($oldBanner['image_url'])) {
                    Storage::disk('public')->delete($oldBanner['image_url']);
                }
            }
        }
        $system->banner = json_encode($banners);
        $system->save();
    
        return redirect()->route('admin.systems.editBanner')->with('success', 'Cập nhật banner thành công!');
    }
}
