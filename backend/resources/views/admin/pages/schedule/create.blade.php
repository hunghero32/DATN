@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
    <div class="content-wrapper">
        <div class="container-xxl flex-grow-1 container-p-y">
            <x-flash-message />
            <div class="card shadow-sm">
                <div class="card-header py-3">
                    <h5 class="mb-0">Tạo lịch khám bệnh</h5>
                </div>
                <div class="card-body">
                    <form action="{{ route('admin.schedule.store') }}" method="POST" id="scheduleForm">
                        @csrf
                        <div class="row mb-4">
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn bác sĩ</label>
                                    <select name="doctor_id" class="form-select form-select-lg shadow-sm @error('doctor_id') is-invalid @enderror" required>
                                        <option value="">Chọn bác sĩ</option>
                                        @foreach($doctors as $doctor)
                                            <option value="{{ $doctor->id }}" {{ old('doctor_id') == $doctor->id ? 'selected' : '' }}>
                                                {{ $doctor->doctor_name }}
                                            </option>
                                        @endforeach
                                    </select>
                                    @error('doctor_id')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                            <div class="col-md-6">
                                <div class="form-group">
                                    <label class="form-label text-uppercase fw-semibold mb-2">Chọn ngày</label>
                                    <input type="date" name="working_date" 
                                           class="form-control form-control-lg shadow-sm @error('working_date') is-invalid @enderror" 
                                           required 
                                           min="{{ date('Y-m-d') }}"
                                           value="{{ old('working_date') }}">
                                    @error('working_date')
                                        <div class="invalid-feedback">{{ $message }}</div>
                                    @enderror
                                </div>
                            </div>
                        </div>

                        <div class="row mb-4">
                            <div class="col-12">
                                <label class="form-label text-uppercase fw-semibold mb-3">Chọn khung giờ và số lượng bệnh nhân</label>
                                <div class="d-flex flex-wrap gap-3">
                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time1" value="08:00,09:00">
                                        <label class="btn btn-outline-warning" for="time1">8:00-9:00</label>
                                        <input type="number" name="max_patients[08:00,09:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time2" value="09:00,10:00">
                                        <label class="btn btn-outline-warning" for="time2">9:00-10:00</label>
                                        <input type="number" name="max_patients[09:00,10:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time3" value="10:00,11:00">
                                        <label class="btn btn-outline-warning" for="time3">10:00-11:00</label>
                                        <input type="number" name="max_patients[10:00,11:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time4" value="11:00,12:00">
                                        <label class="btn btn-outline-warning" for="time4">11:00-12:00</label>
                                        <input type="number" name="max_patients[11:00,12:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time5" value="13:00,14:00">
                                        <label class="btn btn-outline-warning" for="time5">13:00-14:00</label>
                                        <input type="number" name="max_patients[13:00,14:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time6" value="14:00,15:00">
                                        <label class="btn btn-outline-warning" for="time6">14:00-15:00</label>
                                        <input type="number" name="max_patients[14:00,15:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time7" value="15:00,16:00">
                                        <label class="btn btn-outline-warning" for="time7">15:00-16:00</label>
                                        <input type="number" name="max_patients[15:00,16:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>

                                    <div class="time-slot-container">
                                        <input type="checkbox" class="btn-check" name="time_slots[]" id="time8" value="16:00,17:00">
                                        <label class="btn btn-outline-warning" for="time8">16:00-17:00</label>
                                        <input type="number" name="max_patients[16:00,17:00]" class="form-control mt-2" placeholder="Số bệnh nhân" min="1">
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="mt-4 d-flex gap-2">
                            <button type="submit" class="btn btn-primary btn-lg px-4">Lưu thông tin</button>
                            <button type="button" class="btn btn-outline-secondary btn-lg px-4">Hủy</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

    <style>
        .card {
            border: none;
            border-radius: 0.75rem;
        }
        .card-header {
            background-color: transparent;
            border-bottom: 1px solid rgba(0,0,0,0.1);
        }
        .form-control, .form-select {
            border-radius: 0.5rem;
            border: 1px solid #e0e0e0;
            padding: 0.625rem 1rem;
        }
        .form-control:focus, .form-select:focus {
            border-color: #696cff;
            box-shadow: 0 0 0 0.25rem rgba(105, 108, 255, 0.1);
        }
        .time-slot-container {
            background: #fff;
            border-radius: 0.5rem;
            padding: 1rem;
            box-shadow: 0 2px 6px rgba(0,0,0,0.05);
            min-width: 200px;
        }
        .btn-outline-warning {
            background-color: #fff;
            border-color: #ffc107;
            color: #ffc107;
            border-radius: 0.5rem;
            padding: 0.5rem 1rem;
            width: 100%;
            transition: all 0.2s ease;
        }
        .btn-outline-warning:hover,
        .btn-check:checked + .btn-outline-warning {
            background-color: #ffc107 !important;
            border-color: #ffc107 !important;
            color: #000 !important;
            transform: translateY(-1px);
        }
        .form-label {
            color: #566a7f;
            font-size: 0.875rem;
            margin-bottom: 0.5rem;
        }
        input[type="number"] {
            border-radius: 0.375rem;
        }
        .btn {
            font-weight: 500;
            letter-spacing: 0.3px;
        }
    </style>
    <script>
        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('scheduleForm');
            const timeSlots = document.querySelectorAll('input[name="time_slots[]"]');
            const maxPatients = document.querySelectorAll('input[type="number"]');
    
            form.addEventListener('submit', function(e) {
                let isTimeSlotSelected = false;
                let isValid = true;
    
                // Check if at least one time slot is selected
                timeSlots.forEach((slot, index) => {
                    if (slot.checked) {
                        isTimeSlotSelected = true;
                        // Validate corresponding max_patients input
                        if (!maxPatients[index].value || maxPatients[index].value < 1) {
                            maxPatients[index].classList.add('is-invalid');
                            if (!maxPatients[index].nextElementSibling) {
                                const feedback = document.createElement('div');
                                feedback.className = 'invalid-feedback';
                                feedback.textContent = 'Vui lòng nhập số lượng bệnh nhân cho khung giờ này';
                                maxPatients[index].parentNode.appendChild(feedback);
                            }
                            isValid = false;
                        } else {
                            maxPatients[index].classList.remove('is-invalid');
                        }
                    }
                });
    
                if (!isTimeSlotSelected) {
                    alert('Vui lòng chọn ít nhất một khung giờ');
                    e.preventDefault();
                    return;
                }
    
                if (!isValid) {
                    e.preventDefault();
                }
            });
    
            // Add event listeners to time slots
            timeSlots.forEach((slot, index) => {
                slot.addEventListener('change', function() {
                    if (this.checked) {
                        maxPatients[index].required = true;
                    } else {
                        maxPatients[index].required = false;
                        maxPatients[index].classList.remove('is-invalid');
                        const feedback = maxPatients[index].nextElementSibling;
                        if (feedback && feedback.className === 'invalid-feedback') {
                            feedback.remove();
                        }
                    }
                });
            });
        });
    </script>
    <style>
        .is-invalid {
            border-color: #dc3545 !important;
            padding-right: calc(1.5em + 0.75rem) !important;
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 12' width='12' height='12' fill='none' stroke='%23dc3545'%3e%3ccircle cx='6' cy='6' r='4.5'/%3e%3cpath stroke-linejoin='round' d='M5.8 3.6h.4L6 6.5z'/%3e%3ccircle cx='6' cy='8.2' r='.6' fill='%23dc3545' stroke='none'/%3e%3c/svg%3e") !important;
            background-repeat: no-repeat !important;
            background-position: right calc(0.375em + 0.1875rem) center !important;
            background-size: calc(0.75em + 0.375rem) calc(0.75em + 0.375rem) !important;
        }
        .invalid-feedback {
            display: block;
            width: 100%;
            margin-top: 0.25rem;
            font-size: 0.875em;
            color: #dc3545;
        }
    </style>
@endsection
