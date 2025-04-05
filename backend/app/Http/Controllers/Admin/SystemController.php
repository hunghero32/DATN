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
    public function delete($id)
    {
        $post = System::find($id);



        $post->delete(); // Soft delete



        return redirect()->route('admin.systems.index')->with('danger', 'Bài viết đã được xóa.');
    }

    public function edit($id)
    {
    
        $system = System::findOrFail($id);

        return view('admin.pages.system.edit', compact('system'));
    }
    public function update(UpdateSystemRequest $request, $id)
    {
        $system = System::findOrFail($id);


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

        return redirect()->route('admin.systems.edit', $id)->with('success', 'Cấu hình hệ thống đã được cập nhật thành công!');
    }
}
