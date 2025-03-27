@extends('admin.index')

@section('title', 'Danh sách khách mời')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Khách mời /</span> Danh sách</h4>

            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h5 class="mb-0">Danh sách khách mời</h5>
                    <a href="{{ route('admin.guests.create') }}" class="btn btn-primary">Thêm khách mới</a>
                </div>

                <!-- FORM TÌM KIẾM & BỘ LỌC -->
                <div class="card-body">
                    <form method="GET" action="{{ route('admin.guests.index') }}" class="row g-3">
                        <div class="col-md-4">
                            <input type="text" name="search" class="form-control"
                                placeholder="Tìm theo tên, SĐT, địa chỉ" value="{{ request('search') }}">
                        </div>
                        <div class="col-md-3">
                            <select name="gender" class="form-select">
                                <option value="">-- Giới tính --</option>
                                <option value="male" {{ request('gender') == 'male' ? 'selected' : '' }}>Nam</option>
                                <option value="female" {{ request('gender') == 'female' ? 'selected' : '' }}>Nữ</option>
                                <option value="other" {{ request('gender') == 'other' ? 'selected' : '' }}>Khác</option>
                            </select>
                        </div>
                        <div class="col-md-3">
                            <select name="age" class="form-select">
                                <option value="">-- Lọc theo tuổi --</option>
                                <option value="18-25" {{ request('age') == '18-25' ? 'selected' : '' }}>18-25</option>
                                <option value="26-35" {{ request('age') == '26-35' ? 'selected' : '' }}>26-35</option>
                                <option value="36-50" {{ request('age') == '36-50' ? 'selected' : '' }}>36-50</option>
                                <option value="50+" {{ request('age') == '50+' ? 'selected' : '' }}>50+</option>
                            </select>
                        </div>
                        <div class="col-md-2">
                            <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                        </div>
                        @if (request('search') || request('category_id') || request('status') || request('published_at'))
                            <div class="col-md-1 d-grid">
                                <a href="{{ route('admin.guests.index') }}" class="btn btn-secondary">Quay lại</a>
                            </div>
                        @endif
                    </form>
                </div>

                <div class="table-responsive">
                    <table class="table">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Người dùng</th>
                                <th>Tên khách</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th>Địa chỉ</th>
                                <th>Tệp</th>
                                <th>Ngày tạo</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($guests as $guest)
                                <tr>
                                    <td>{{ ($guests->currentPage() - 1) * $guests->perPage() + $loop->iteration }}</td>
                                    <td>{{ $guest->user->name ?? 'N/A' }}</td>
                                    <td>{{ $guest->guest_name }}</td>
                                    <td>{{ ucfirst($guest->gender) }}</td>
                                    <td>{{ $guest->birthday ?? 'N/A' }}</td>
                                    <td>{{ $guest->guest_phone ?? 'N/A' }}</td>
                                    <td>{{ $guest->guest_email ?? 'N/A' }}</td>
                                    <td>
                                        @php
                                        $address = is_string($guest->address) ? json_decode($guest->address, true) : $guest->address;
                                    @endphp
                                    {{ is_array($address) ? implode(', ', $address) : ($guest->address ?? 'Không có địa chỉ') }}

                                    </td>

                                    <td>
                                        <img src={{ Storage::Url($guest->file) }} width="70px">
                                    </td>

                                    <td>{{ $guest->created_at->format('d-m-Y') }}</td>
                                    <td>
                                        <a href="{{ route('admin.guests.edit', $guest->id) }}"
                                            class="btn btn-sm btn-warning">show</a>

                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="card-footer">
                    {{ $guests->appends(request()->query())->links() }} <!-- Phân trang -->
                </div>
            </div>
        </div>
    </div>
@endsection
