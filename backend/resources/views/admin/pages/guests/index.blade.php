@extends('admin.index')

@section('title', 'Danh sách khách hàng')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">khách hàng /</span> Danh sách khách hàng</h4>

            <div class="card">
                <div class="card-header d-flex justify-content-between">
                    <h5 class="mb-0">Danh sách khách hàng</h5>
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
                        @if (request('search') || request('gender') || request('age'))
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
                                <th>#</th>
                                <th>Tên khách</th>
                                <th>Giới tính</th>
                                <th>Ngày sinh</th>
                                <th>SĐT</th>
                                <th>Email</th>
                                <th><i class='bx bx-menu'></i></th>
                            </tr>
                        </thead>
                        <tbody>
                            @foreach ($guests as $guest)
                                @php
                                    $genderMapping = ['male' => 'Nam', 'female' => 'Nữ'];
                                @endphp
                                <tr>
                                    <td>{{ ($guests->currentPage() - 1) * $guests->perPage() + $loop->iteration }}</td>
                                    <td>{{ $guest->guest_name ?? 'N/A' }}</td>
                                    <td>{{ $genderMapping[$guest->gender] ?? 'Không xác định' }}</td>
                                    <td>{{ $guest->birthday ?? 'N/A' }}</td>
                                    <td>{{ $guest->guest_phone ?? 'N/A' }}</td>
                                    <td>{{ $guest->guest_email ?? 'N/A' }}</td>
                                    <td>
                                        <button type="button" class="btn btn-sm border-danger btn-warning btn-show-guest"
                                            data-bs-toggle="modal" data-bs-target="#guestModal"
                                            data-id="{{ $guest->id }}"
                                            data-name="{{ $guest->guest_name ?? (optional($guest->user)->name ?? 'N/A') }}"
                                            data-gender="{{ $genderMapping[$guest->gender] ?? 'Không xác định' }}"
                                            data-birthday="{{ $guest->birthday ?? 'N/A' }}"
                                            data-phone="{{ $guest->guest_phone ?? 'N/A' }}"
                                            data-email="{{ $guest->guest_email ?? 'N/A' }}"
                                            data-address="{{ $guest->address ?? 'N/A' }}">
                                            <i class='bx bxs-info-circle'></i>
                                        </button>
                                    </td>
                                </tr>
                            @endforeach
                        </tbody>
                    </table>
                </div>

                <div class="card-footer">
                    {{ $guests->appends(request()->query())->links() }}
                </div>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="guestModal" tabindex="-1" aria-labelledby="guestModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content border-0 shadow rounded-3">
                <div class="modal-header text-white rounded-top">
                    <h5 class="modal-title" id="guestModalLabel"><i class="bx bx-user"></i> Thông tin khách hàng</h5>
                    <button type="button" class="btn-close btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body p-4">
                    <div class="row mb-3">
                        <div class="col-4 fw-semibold text-muted">👤 Tên khách:</div>
                        <div class="col-8" id="modalGuestName"></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4 fw-semibold text-muted">⚥ Giới tính:</div>
                        <div class="col-8" id="modalGuestGender"></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4 fw-semibold text-muted">🎂 Ngày sinh:</div>
                        <div class="col-8" id="modalGuestBirthday"></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4 fw-semibold text-muted">📞 Số điện thoại:</div>
                        <div class="col-8" id="modalGuestPhone"></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4 fw-semibold text-muted">✉️ Email:</div>
                        <div class="col-8" id="modalGuestEmail"></div>
                    </div>
                    <div class="row mb-3">
                        <div class="col-4 fw-semibold text-muted">📌 Địa chỉ:</div>
                        <div class="col-8" id="modalGuestAddress"></div>
                    </div>
                </div>
                <div class="modal-footer  rounded-bottom">
                    <a href="#" id="btnViewMedicalRecord" class="btn btn-primary">
                        Hồ sơ bệnh án
                    </a>

                </div>
            </div>
        </div>
    </div>

    @push('scripts')
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                const showButtons = document.querySelectorAll('.btn-show-guest');

                showButtons.forEach(button => {
                    button.addEventListener('click', function() {
                        document.getElementById('modalGuestName').innerText = this.getAttribute(
                            'data-name');
                        document.getElementById('modalGuestGender').innerText = this.getAttribute(
                            'data-gender');
                        document.getElementById('modalGuestBirthday').innerText = this.getAttribute(
                            'data-birthday');
                        document.getElementById('modalGuestPhone').innerText = this.getAttribute(
                            'data-phone');
                        document.getElementById('modalGuestEmail').innerText = this.getAttribute(
                            'data-email');
                        document.getElementById('modalGuestAddress').innerText = this.getAttribute(
                            'data-address');

                        const guestId = this.getAttribute('data-id');
                        const route = `{{ url('admin/guests') }}/${guestId}`;
                        btnViewMedicalRecord.onclick = function() {
                            window.location.href = route;
                        }
                    });
                });
            });
        </script>
    @endpush
@endsection
