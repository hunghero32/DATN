@extends('admin.index')

@section('content')
<div class="container mt-4">
    <div class="d-flex justify-content-between align-items-center">
        <h2 class="mb-3">Danh sách cấu hình hệ thống</h2>
        <a href="{{ route('admin.systems.create') }}" class="btn btn-primary">
            <i class="bi bi-plus-circle"></i> Thêm mới
        </a>
    </div>

    <div class="table-responsive">
        <table class="table table-hover table-bordered align-middle text-center">
            <thead class="table-dark">
                <tr>
                    <th>ID</th>
                    <th>Tên trang</th>
                    <th>Mô tả</th>
                    <th>Từ khóa</th>
                    <th>Logo</th>
                    <th>Favicon</th>
                    <th>URL</th>
                    <th>Meta Tags</th>
                    <th>Ngôn ngữ</th>
                    <th>Múi giờ</th>
                    <th>Tracking Code</th>
                 
                    <th>Hành động</th>
                </tr>
            </thead>
            <tbody>
                @foreach ($systems as $system)
                <tr>
                    <td>{{ $system->id }}</td>
                    <td>{{ $system->site_name }}</td>
                    <td class="text-truncate" style="max-width: 150px;">{{ $system->site_description }}</td>
                    <td>{{ $system->site_keywords }}</td>
                    <td>
                        @if($system->site_logo)
                            <img src="{{ asset('storage/' . $system->site_logo) }}" class="img-thumbnail" width="50">
                        @endif
                    </td>
                    <td>
                        @if($system->site_favicon)
                            <img src="{{ asset('storage/' . $system->site_favicon) }}" class="img-thumbnail" width="20">
                        @endif
                    </td>
                    <td><a href="{{ $system->site_url }}" target="_blank">{{ $system->site_url }}</a></td>
                    <td>{{ $system->meta_tags }}</td>
                    <td>{{ $system->default_language }}</td>
                    <td>{{ $system->timezone }}</td>
                    <td>{{ $system->tracking_code }}</td>


                    <td>
                        <a href="{{ route('admin.systems.edit', $system->id) }}" class="btn btn-warning btn-sm">
                            <i class="bi bi-pencil-square"></i>
                        </a>
                        <form action="{{ route('admin.systems.delete', $system->id) }}" method="POST" class="d-inline">
                            @csrf
                            @method('DELETE')
                            <button type="submit" onclick="return confirm('Bạn có chắc chắn muốn xóa?')" class="btn btn-danger btn-sm">
                                <i class="bi bi-trash"></i>
                            </button>
                        </form>
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>

    <!-- Phân trang -->
    <div class="d-flex justify-content-center mt-3">
        {{ $systems->links() }}
    </div>
</div>
@endsection
