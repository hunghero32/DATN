@extends('admin.index')
@section('title', 'Chi tiết hồ sơ bệnh án')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">

            <h4 class="fw-bold py-3 mb-4">
                <span class="text-muted fw-light">Hồ sơ bệnh án /</span> Chi tiết
            </h4>
            <div class="card shadow-sm rounded-3">
                <div class="card-body">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Bệnh nhân</label>
                            <div class="form-control bg-light border">{{ $record->guest->guest_name }}</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Bảo hiểm y tế</label>
                            <div class="form-control bg-light border">{!! $record->BHYT ?? 'Không có thông tin' !!}</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Tình trạng bệnh</label>
                            <div class="form-control bg-light border">{!! $record->medical_condition ?? 'Không có thông tin' !!}</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Thuốc đang sử dụng</label>
                            <div class="form-control bg-light border">{!! $record->medications ?? 'Không có thông tin' !!}</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Dị ứng</label>
                            <div class="form-control bg-light border">{!! $record->allergies ?? 'Không có thông tin' !!}</div>
                        </div>
                        <div class="col-md-6">
                            <label class="form-label fw-semibold">Tiền sử gia đình</label>
                            <div class="form-control bg-light border">{!! $record->family_history ?? 'Không có thông tin' !!}</div>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label fw-semibold">Phác đồ điều trị</label>
                            <div class="form-control bg-light border">{!! $record->treatment ?? 'Không có thông tin' !!}</div>
                        </div>
                        <div class="col-md-12">
                            <label class="form-label fw-semibold">Ghi chú</label>
                            <div class="form-control bg-light border">{!! $record->note ?? 'Không có ghi chú' !!}</div>
                        </div>
                    </div>
                    <div class="mt-4 text-end">
                        <a href="{{ route('admin.medical_records.index') }}" class="btn btn-secondary">
                            <i class="fa-solid fa-arrow-left me-1"></i> Quay lại danh sách
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection
