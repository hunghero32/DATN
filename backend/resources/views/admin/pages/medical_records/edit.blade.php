@extends('admin.index')

@section('title', 'Chỉnh sửa hồ sơ bệnh án')

@section('content')

<div class="content-wrapper">

    <div class="container-xxl flex-grow-1 container-p-y">

        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Hồ sơ bệnh án /</span> Chỉnh sửa</h4>

        <div class="card">

            <div class="card-body">

                <form action="{{ route('admin.pages.medical_records.update', $record->id) }}" method="POST">
                    
                    @csrf
                    @method('PUT')

                    <div class="row">

                        <div class="mb-3 col-md-6">
                            <label class="form-label">Bệnh nhân</label>
                            <input type="text" class="form-control" value="{{ $record->guest->guest_name }}" disabled>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="BHYT" class="form-label">Bảo hiểm y tế</label>
                            <textarea class="form-control" id="BHYT" name="BHYT">{{ old('BHYT', $record->BHYT) }}</textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="medical_condition" class="form-label">Tình trạng bệnh</label>
                            <textarea class="form-control" id="medical_condition" name="medical_condition">{{ old('medical_condition', $record->medical_condition) }}</textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="medications" class="form-label">Thuốc đang sử dụng</label>
                            <textarea class="form-control" id="medications" name="medications">{{ old('medications', $record->medications) }}</textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="allergies" class="form-label">Dị ứng</label>
                            <textarea class="form-control" id="allergies" name="allergies">{{ old('allergies', $record->allergies) }}</textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="family_history" class="form-label">Tiền sử gia đình</label>
                            <textarea class="form-control" id="family_history" name="family_history">{{ old('family_history', $record->family_history) }}</textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="treatment" class="form-label">Phác đồ điều trị</label>
                            <textarea class="form-control" id="treatment" name="treatment">{{ old('treatment', $record->treatment) }}</textarea>
                        </div>

                        <div class="mb-3 col-md-6">
                            <label for="note" class="form-label">Ghi chú</label>
                            <textarea class="form-control" id="note" name="note">{{ old('note', $record->note) }}</textarea>
                        </div>
                        
                    </div>

                    <div class="mt-3">
                        <button type="submit" class="btn btn-primary">Cập nhật</button>
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
    $(document).ready(function() {
        ClassicEditor
        .create(document.querySelector('#BHYT'))
        .catch(error => console.error(error));

        ClassicEditor
        .create(document.querySelector('#medical_condition'))
        .catch(error => console.error(error));

        ClassicEditor
        .create(document.querySelector('#medications'))
        .catch(error => console.error(error));

        ClassicEditor
        .create(document.querySelector('#allergies'))
        .catch(error => console.error(error));

        ClassicEditor
        .create(document.querySelector('#family_history'))
        .catch(error => console.error(error));

        ClassicEditor
        .create(document.querySelector('#treatment'))
        .catch(error => console.error(error));

        ClassicEditor
        .create(document.querySelector('#note'))
        .catch(error => console.error(error));
    });
</script>

@endsection
