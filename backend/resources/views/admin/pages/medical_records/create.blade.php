@extends('admin.index')

@section('title', 'Thêm hồ sơ bệnh án')

@section('content')

    <div class="content-wrapper">

        <div class="container-xxl flex-grow-1 container-p-y">

            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Hồ sơ bệnh án /</span> Thêm mới</h4>

            <div class="card">

                <div class="card-body">

                    <form action="{{ route('admin.medical_records.store') }}" method="POST">
                        @csrf
                        <div class="row">

                            <div class="mb-3 col-md-6">
                                <label for="guest_id" class="form-label"> Bệnh nhân</label>
                                <select id="guest_id" name="guest_id" class="form-control select2">
                                    <option value="">-- Chọn bệnh nhân --</option>
                                    @foreach ($guests as $id => $name)
                                        <option value="{{ $id }}">{{ $name }}</option>
                                    @endforeach
                                </select>
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="BHYT" class="form-label"> Bảo hiểm y tế</label>
                                <input type="text" class="form-control" id="BHYT" name="BHYT">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="medical_condition" class="form-label"> Tình trạng bệnh</label>
                                <input type="text" class="form-control" id="medical_condition" name="medical_condition">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="medications" class="form-label">Thuốc đang sử dụng</label>
                                <input type="text" class="form-control" id="medications" name="medications">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="allergies" class="form-label">Dị ứng</label>
                                <input type="text" class="form-control" id="allergies" name="allergies">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="family_history" class="form-label">Tiền sử gia đình</label>
                                <input type="text" class="form-control" id="family_history" name="family_history">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="treatment" class="form-label"> Phác đồ điều trị</label>
                                <input type="text" class="form-control" id="treatment" name="treatment">
                            </div>

                            <div class="mb-3 col-md-6">
                                <label for="note" class="form-label">Ghi chú</label>
                                <input type="text" class="form-control" id="note" name="note">
                            </div>
                        </div>

                        <div class="mt-3">
                            <button type="submit" class="btn btn-primary">Lưu</button>
                            <a href="{{ route('admin.medical_records.index') }}" class="btn btn-secondary">Quay lại</a>
                        </div>

                    </form>

                </div>

            </div>

        </div>

    </div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">

<script>
    $.noConflict();
        jQuery(document).ready(function($) {
            $(".select2").each(function() {
                $(this).select2();
            });
        });
</script>

@endsection
