@extends('admin.index')
@section('title', 'Cấu hình Website')
@section('content')
<div class="content-wrapper">
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Cấu hình Website</h4>

        <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
                <h5 class="mb-0">Danh sách cài đặt</h5>
                <a href="{{ route('admin.systems.create') }}" class="btn btn-success">Thêm mới</a>
            </div>

            <div class="table-responsive text-nowrap">
                <table class="table table-bordered">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên</th>
                            <th>Mô tả</th>
                            <th>Từ khóa</th>
                            <th>Logo</th>
                            <th>Favicon</th>
                            <th>URL</th>
                            <th>Ngôn ngữ mặc định</th>
                            <th>Múi giờ</th>
                            <th>Địa chỉ</th>
                            <th>Hotline</th>

                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        @foreach ($systems as $setting)
                        <tr>
                            <td>{{ $setting->id }}</td>
                            <td>{{ $setting->site_name }}</td>
                            <td>{{ Str::limit($setting->site_description, 50) }}</td>
                            <td>{{ $setting->site_keywords }}</td>
                            <td><img src="{{ asset($setting->site_logo) }}" width="50"></td>
                            <td><img src="{{ asset($setting->site_favicon) }}" width="30"></td>
                            <td>{{ $setting->site_url }}</td>
                            <td>{{ $setting->default_language }}</td>
                            <td>{{ $setting->timezone }}</td>
                            <td>{{ $setting->address }}</td>
                            <td>{{ $setting->hotline }}</td>

                            <td>
                                <a href="{{ route('admin.systems.edit', $setting->id) }}" class="btn btn-warning btn-sm">show</a>

                            </td>
                        </tr>
                        @endforeach
                    </tbody>
                </table>
            </div>

            <div class="mt-3">
                {{ $systems->links() }}
            </div>
        </div>
    </div>
</div>
@endsection
