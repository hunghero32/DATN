@extends('admin.index')

@section('title', 'Thông tin khách mời')

@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4">
                <span class="text-muted fw-light">Khách mời /</span> Thông tin khách mời
            </h4>

            <div class="card">
                <div class="card-body">
                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label class="form-label">Người dùng</label>
                            <p class="form-control-plaintext">{{ $guest->user->name ?? 'Không có' }}</p>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Tên khách mời</label>
                            <p class="form-control-plaintext">{{ $guest->guest_name }}</p>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Giới tính</label>
                            <p class="form-control-plaintext">
                                @if ($guest->gender == 'male')
                                    Nam
                                @elseif ($guest->gender == 'female')
                                    Nữ
                                @else
                                    Khác
                                @endif
                            </p>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Ngày sinh</label>
                            <p class="form-control-plaintext">{{ $guest->birthday }}</p>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Số điện thoại</label>
                            <p class="form-control-plaintext">{{ $guest->guest_phone }}</p>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Email</label>
                            <p class="form-control-plaintext">{{ $guest->guest_email }}</p>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Địa chỉ</label>

                            @php
                                
                                $address = is_array($guest->address) ? $guest->address : json_decode($guest->address, true);
                            @endphp

                            <p class="form-control-plaintext">
                                {{ isset($address['street']) && isset($address['city']) ? ($address['street'] . ', ' . $address['city']) : 'Không có địa chỉ' }}
                            </p>
                        </div>



                        <div class="mb-3 col-md-6">
                            <label class="form-label">Tệp đính kèm</label><br>
                            @if ($guest->file)
                                <img src="{{ asset('storage/' . $guest->file) }}" width="100px"
                                    style="border-radius: 5px;">
                            @else
                                <p class="form-control-plaintext">Không có tệp đính kèm</p>
                            @endif
                        </div>
                    </div>

                    <div class="mt-3">
                        <a href="{{ route('admin.guests.index') }}" class="btn btn-secondary">Quay lại</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
