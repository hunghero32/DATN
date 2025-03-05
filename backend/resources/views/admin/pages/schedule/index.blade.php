@extends('admin.index')
@section('title', 'Thông tin đặt lịch bác sĩ')
@section('content')
    <?php
    $doctor = $data->pluck('doctor_id', 'doctor_name')->toArray();
    $detailModal = [
        'fields' => [['name' => 'doctor_id', 'label' => 'Bác sĩ', 'type' => 'select', 'options' => $doctor], ['name' => 'time_start', 'label' => 'Giờ bắt đầu', 'type' => 'time'], ['name' => 'time_end', 'label' => 'Giờ kết thúc', 'type' => 'time'], ['name' => 'working_date', 'label' => 'Ngày làm việc', 'type' => 'date'], ['name' => 'max_patients', 'label' => 'Số lượng bệnh nhân tối đa', 'type' => 'number'], ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động', 1 => 'Hoạt động']]],
    ];
    $selects = [
        'status' => [
            'id' => 'status',
            'name' => 'status',
            'label' => 'Trạng thái',
            'options' => [
                '' => 'Tất cả',
                '1' => 'Đã kịch hoạt',
                '0' => 'Chưa kích hoạt'
            ]
        ]
    ];
    ?>
    <x-table-list-component :title="'Danh sách đặt lịch'" :route="route('admin.schedule.search')" :columns="[
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'doctor_name', 'label' => 'Họ và Tên'],
        ['key' => 'time_start', 'label' => 'Giờ bắt đầu'],
        ['key' => 'time_end', 'label' => 'Giờ kết thúc'],
        ['key' => 'working_date', 'name' => 'approve', 'label' => 'Ngày làm việc'],
        ['key' => 'max_patients', 'label' => 'Số lượng bệnh nhân tối đa'],
        ['key' => 'status', 'name' => 'status', 'label' => 'Trạng thái'],
    ]"
    :data="$data" :selects="$selects"
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
