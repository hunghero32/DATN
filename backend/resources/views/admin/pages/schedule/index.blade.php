@extends('admin.index')
@section('title', 'Thông tin đặt lịch bác sĩ')
@section('content')
    <?php
    // Change this line
    $doctor = App\Models\Doctor::pluck('doctor_name', 'id')->toArray();

    // Add status configuration
    $statusConfig = [
        'route' => 'admin.schedule.update-status',
        'states' => config('common.statuses'),
    ];

    $detailModal = [
        'fields' => [
            ['name' => 'doctor_id', 'label' => 'Bác sĩ', 'type' => 'select', 'options' => $doctor],
            ['name' => 'time_start', 'label' => 'Giờ bắt đầu', 'type' => 'time'],
            ['name' => 'time_end', 'label' => 'Giờ kết thúc', 'type' => 'time'],
            ['name' => 'working_date', 'label' => 'Ngày làm việc', 'type' => 'date'],
            ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động', 1 => 'Hoạt động']]
        ],
    ];
    ?>

    <x-table-list-component
        :title="'Lịch Làm Việc'"
        :route="route('admin.schedule.search')"
        :columns="[
            ['key' => 'doctor_name', 'label' => 'Họ và Tên Bác sĩ'],
            ['key' => 'time_start', 'label' => 'Giờ bắt đầu'],
            ['key' => 'time_end', 'label' => 'Giờ kết thúc'],
            ['key' => 'working_date', 'name' => 'approve', 'label' => 'Ngày làm việc'],
            ['key' => 'status', 'name' => 'status', 'label' => 'Trạng thái', 'status_config' => $statusConfig],
        ]"
        :data="$data"
        :selects="[
            [
                'id' => 'doctor_name',
                'name' => 'doctor_name',
                'class' => 'select-search',
                'options' => ['all' => 'Tất cả bác sĩ'] + $doctor
            ],
            [
                'id' => 'status',
                'name' => 'status',
                'class' => 'select-search',
                'options' => ['all' => 'Tất cả trạng thái'] + (config('app.statuses') ?? [])
            ]
        ]"
        :detailModal="$detailModal"
        :actions="[
            [
                'label' => 'Thêm mới',
                'route' => fn() => route('admin.schedule.create'),
                'method' => 'GET',
                'type' => 'global',
                'class' => 'btn btn-success btn-sm',
            ],
            [
                'label' => 'Chỉnh sửa',
                'route' => fn($id) => route('admin.schedule.edit', $id),
                'method' => 'GET',
                'type' => 'row',
                'class' => 'btn btn-primary btn-sm',
            ],
            [
                'label' => 'Xem chi tiết',
                'route' => fn($id) => route('admin.schedule.show', $id),
                'method' => 'GET',
                'modal' => true,
                'type' => 'row',
                'class' => 'btn btn-info btn-sm',
            ],
            [
                'label' => 'Xóa',
                'route' => fn($id) => route('admin.schedule.delete', $id),
                'method' => 'DELETE',
                'type' => 'row',
                'modal' => true,
                'confirm' => 'Bạn có chắc muốn xóa?',
            ],
        ]" />

@endsection
