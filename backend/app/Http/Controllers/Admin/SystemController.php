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


        // Xử lý upload logo nếu có file mới
        if ($request->hasFile('site_logo')) {
            // Xóa logo cũ nếu có
            if ($system->site_logo) {
                Storage::delete($system->site_logo);
            }
            $logoPath = $request->file('site_logo')->store('logos', 'public');
            $system->site_logo = $logoPath;
        }

        // Xử lý upload favicon nếu có file mới
        if ($request->hasFile('site_favicon')) {
            // Xóa favicon cũ nếu có
            if ($system->site_favicon) {
                Storage::delete($system->site_favicon);
            }
            $faviconPath = $request->file('site_favicon')->store('favicons', 'public');
            $system->site_favicon = $faviconPath;
        }

        // Cập nhật các trường khác
        $system->update([
            'site_name' => $request->site_name,
            'site_description' => $request->site_description,
            'site_keywords' => $request->site_keywords,
            'site_url' => $request->site_url,
            'default_language' => $request->default_language,
            'timezone' => $request->timezone,
            'meta_tags' => $request->meta_tags,
            'tracking_code' => $request->tracking_code,
            'company_address' => $request->company_address,
            'company_phone' => $request->company_phone,
            'company_email' => $request->company_email,
        ]);

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
            'banners' => 'nullable|array', // Kiểm tra mảng banner
            'banners.*.image_url' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048', // Hình ảnh của banner
            'banners.*.title' => 'nullable|string|max:255', // Tên của banner
        ]);
    
        $system = System::first(); // Hoặc tìm bản ghi tương ứng
    
        // Lấy dữ liệu cũ của banner
        $existingBanners = json_decode($system->banner, true) ?? [];
    
        // Xử lý mảng banner
        $banners = [];
        foreach ($request->banners as $index => $banner) {
            $imageName = null;
    
            // Kiểm tra nếu có file hình ảnh mới
            if (isset($banner['image_url']) && $request->hasFile("banners.$index.image_url")) {
                // Xóa ảnh cũ nếu có
                if (isset($existingBanners[$index]['image_url'])) {
                    $oldImagePath = public_path('storage/banner_images/' . $existingBanners[$index]['image_url']);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath); // Xóa ảnh cũ
                    }
                }
    
                // Lưu ảnh mới
                $imagePath = $banner['image_url']->store('banner_images', 'public'); // Lưu vào thư mục public/banner_images
                $imageName = basename($imagePath); // Lưu tên file vào DB
            } elseif (isset($banner['image_url']) && empty($banner['image_url'])) {
                // Nếu không có ảnh mới và để trống, thì xóa ảnh cũ
                if (isset($existingBanners[$index]['image_url'])) {
                    $oldImagePath = public_path('storage/banner_images/' . $existingBanners[$index]['image_url']);
                    if (file_exists($oldImagePath)) {
                        unlink($oldImagePath); // Xóa ảnh cũ nếu không có ảnh mới
                    }
                }
            } else {
                // Nếu không có ảnh mới, giữ nguyên ảnh cũ
                $imageName = $existingBanners[$index]['image_url'] ?? null;
            }
    
            // Thêm banner vào mảng
            $banners[] = [
                'title' => $banner['title'] ?? null,
                'image_url' => $imageName, // Nếu không có ảnh mới thì giữ nguyên
            ];
        }
    
        // Lưu mảng banner vào cơ sở dữ liệu
        $system->banner = json_encode($banners);
        $system->save();
    
        return redirect()->route('admin.systems.editBanner')->with('success', 'Cập nhật banner thành công!');
    }
}
