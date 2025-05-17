@extends('admin.index')

@section('title', 'Thêm hồ sơ bệnh án')

@section('content')

<div class="content-wrapper">

    <div class="container-xxl flex-grow-1 container-p-y">

        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Hồ sơ bệnh án /</span> Thêm mới</h4>

        <div class="card">

            <div class="card-body">

                <form action="{{ route('admin.pages.medical_records.store') }}" method="POST">

                    @csrf

                    <div class="row">

                        <div class="mb-3 col-md-6">
                            <label for="guest_id" class="form-label">Bệnh nhân</label>
                            <select id="guest_id" name="guest_id" class="form-control select2">
                                <option value="">-- Chọn bệnh nhân --</option>
                                @foreach ($guests as $id => $name)
                                    <option value="{{ $id }}">{{ $name }}</option>
                                @endforeach
                            </select>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="BHYT" class="form-label">Bảo hiểm y tế</label>
                            <textarea class="form-control" id="BHYT" name="BHYT"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="medical_condition" class="form-label">Tình trạng bệnh</label>
                            <textarea class="form-control" id="medical_condition" name="medical_condition"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="medications" class="form-label">Thuốc đang sử dụng</label>
                            <textarea class="form-control" id="medications" name="medications"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="allergies" class="form-label">Dị ứng</label>
                            <textarea class="form-control" id="allergies" name="allergies"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="family_history" class="form-label">Tiền sử gia đình</label>
                            <textarea class="form-control" id="family_history" name="family_history"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="treatment" class="form-label">Phác đồ điều trị</label>
                            <textarea class="form-control" id="treatment" name="treatment"></textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="note" class="form-label">Ghi chú</label>
                            <textarea class="form-control" id="note" name="note"></textarea>
                        </div>

                    </div>

                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary">Lưu</button>
                        <a href="{{ route('admin.pages.medical_records.index') }}" class="btn btn-secondary">Quay lại</a>
                    </div>

                </form>

            </div>

        </div>

    </div>

</div>

<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>

<script src="https://cdn.jsdelivr.net/npm/select2@4.0.13/dist/js/select2.min.js"></script>

<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.13/css/select2.min.css">

<script src="https://cdn.ckeditor.com/ckeditor5/34.0.0/classic/ckeditor.js"></script>

<script>
    $.noConflict();
    jQuery(document).ready(function($) {

        $(".select2").select2();

        ClassicEditor
            .create(document.querySelector('#BHYT'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#medical_condition'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#medications'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#allergies'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#family_history'))
            .catch(error => {
                console.error(error);
            });

        ClassicEditor
            .create(document.querySelector('#treatment'))
            .catch(error => {
                console.error(error);
            });
            
        ClassicEditor
            .create(document.querySelector('#note'))
            .catch(error => {
                console.error(error);
            });
    });
</script>

@endsection