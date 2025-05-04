@extends('layouts.app')
@section('content')
<div class="container-xxl mt-5">
    <div class="card">
        <div class="card-header d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Danh Sách Người Dùng</h5>
            <!-- Thông báo thành công -->
            @if(session('success'))
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <div class="d-flex justify-content-between align-items-center">
                    <strong>{{ session('success') }}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            @endif

            <!-- Thông báo lỗi -->
            @if(session('error'))
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <div class="d-flex justify-content-between align-items-center">
                    <strong>{{ session('error') }}</strong>
                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                </div>
            </div>
            @endif
            <div class="d-flex gap-2">
                @if (in_array(Auth::user()->role, ['admin']))
                <a href="{{ route('admin.users.create') }}" class="btn btn-primary"><i class="fa-solid fa-user-plus"></i></a>
                @endif
                <!-- Nút bộ lọc -->
                <button class="btn btn-outline-secondary" onclick="toggleFilter()">
                    <i class="fas fa-filter"></i>
                </button>
            </div>
        </div>
        <!-- Bộ lọc -->
        <div class="card-body" id="filterForm" style="display: none;">
            <form method="GET" action="{{ route('admin.users.index')}}">
                <div class="row">
                    <!-- Lọc theo vai trò -->
                    <div class="col-md-6 mb-3">
                        <select name="role" class="form-select">
                            <option value="">Tất Cả</option>
                            <option value="guest" {{ request('role') == 'guest' ? 'selected' : '' }}>Khách</option>
                            <option value="regular" {{ request('role') == 'regular' ? 'selected' : '' }}>Thường</option>
                            <option value="premium" {{ request('role') == 'premium' ? 'selected' : '' }}>Cao cấp</option>
                            <option value="vip" {{ request('role') == 'vip' ? 'selected' : '' }}>VIP</option>
                            <option value="admin" {{ request('role') == 'admin' ? 'selected' : '' }}>Admin</option>
                        </select>
                    </div>


                    <!-- Lọc theo thời gian đăng nhập gần nhất -->
                    <div class="col-md-6 mb-3">
                        <input type="date" name="last_login_at" class="form-control" value="{{ request('last_login_at') }}">
                    </div>
                </div>

                <div class="row">
                    <!-- Lọc theo số dư tài khoản -->
                    <div class="col-md-5 mb-3">
                        <input type="number" name="balance" class="form-control" placeholder="Số dư từ..." value="{{ request('balance') }}">
                    </div>
                    <!-- Tìm kiếm chung -->
                    <div class="col-md-5 mb-3">
                        <input type="text" name="search" class="form-control" placeholder="Tìm kiếm theo tên, email, số điện thoại, số dư, vai trò..." value="{{ request('search') }}">
                    </div>
                    <div class="col-md-2 mb-3">
                        <button type="submit" class="btn btn-primary me-2"><i class="fa-solid fa-magnifying-glass"></i></button>
                        <a href="{{ route('admin.users.index') }}" class="btn btn-secondary"><i class="fa-solid fa-circle-xmark"></i></a>
                    </div>
                </div>
            </form>
        </div>

        <div class="card-body table-responsive">
            <table class="table table-bordered table-hover">
                <thead class="table-light">
                    <tr>
                        <th>#</th>
                        <th>Tên</th>
                        <th>Số Dư</th>
                        <th>Quyền</th>
                        <th>2FA</th>
                        @if (in_array(Auth::user()->role, ['admin']))
                        <th class="text-center"><i class="fa-solid fa-gear"></i>HĐ</th>
                        @endif
                    </tr>
                </thead>
                <tbody>
                    @foreach ($users as $index => $user)
                    <tr>
                        <td>{{ ($users->currentPage() - 1) * $users->perPage() + $loop->iteration }}</td>
                        <td>{{ $user->name }} ({{ $user->id }})</td>
                        <td>{{ number_format($user->balance) }}đ</td>
                        <td>
                            {{ [
                                    'guest' => 'Khách',
                                    'regular' => 'Thường',
                                    'premium' => 'Cao cấp',
                                    'vip' => 'VIP',
                                    'manage' => 'Quản Lý',
                                    'admin' => 'Admin'
                                ][$user->role] }}
                        </td>
                        <td>{{ $user->two_factor_enabled ? 'Đã bật' : 'Chưa bật' }}</td>
                        @if (in_array(Auth::user()->role, ['admin']))
                        <td>
                            <a href="{{ route('admin.users.edit', $user->id) }}" class="btn btn-warning btn-sm"><i class="fa-solid fa-gear"></i></a>
                            <a href="{{ route('admin.users.showAddBalanceForm', $user->id) }}" class="btn btn-success btn-sm"><i class="fa-solid fa-money-bill"></i></a>
                        </td>
                        @endif
                    </tr>
                    @endforeach
                </tbody>
            </table>
        </div>
    </div>
    <div class="card-body">
        <div class="row">
            <div class="col">
                <div class="demo-inline-spacing">
                    <!-- Basic Pagination -->
                    <nav aria-label="Page navigation">
                        <ul class="pagination">
                            <!-- First Page -->
                            @if ($users->currentPage() > 1)
                            <li class="page-item first">
                                <a class="page-link" href="{{ $users->url(1) }}">
                                    <i class="tf-icon bx bx-chevrons-left"></i>
                                </a>
                            </li>
                            @endif

                            <!-- Previous Page -->
                            @if ($users->currentPage() > 1)
                            <li class="page-item prev">
                                <a class="page-link" href="{{ $users->previousPageUrl() }}">
                                    <i class="tf-icon bx bx-chevron-left"></i>
                                </a>
                            </li>
                            @endif

                            <!-- Page Numbers (max 5 pages) -->
                            @php
                            $currentPage = $users->currentPage();
                            $lastPage = $users->lastPage();
                            $start = max(1, $currentPage - 2); // Start 2 pages before current page
                            $end = min($lastPage, $currentPage + 2); // End 2 pages after current page
                            @endphp

                            @for ($i = $start; $i <= $end; $i++)
                                <li class="page-item {{ $currentPage == $i ? 'active' : '' }}">
                                <a class="page-link" href="{{ $users->url($i) }}">{{ $i }}</a>
                                </li>
                                @endfor

                                <!-- Next Page -->
                                @if ($users->currentPage() < $users->lastPage())
                                    <li class="page-item next">
                                        <a class="page-link" href="{{ $users->nextPageUrl() }}">
                                            <i class="tf-icon bx bx-chevron-right"></i>
                                        </a>
                                    </li>
                                    @endif

                                    <!-- Last Page -->
                                    @if ($users->currentPage() < $users->lastPage())
                                        <li class="page-item last">
                                            <a class="page-link" href="{{ $users->url($users->lastPage()) }}">
                                                <i class="tf-icon bx bx-chevrons-right"></i>
                                            </a>
                                        </li>
                                        @endif
                        </ul>
                    </nav>
                    <!--/ Basic Pagination -->
                </div>
            </div>
        </div>
    </div>
</div>
<script>
    // Hàm ẩn hiện bộ lọc
    function toggleFilter() {
        const filterForm = document.getElementById('filterForm');
        filterForm.style.display = (filterForm.style.display === 'none' || filterForm.style.display === '') ? 'block' : 'none';
    }
</script>
@endsection