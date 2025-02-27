@extends('admin.index')
@section('title', 'Thông tin đặt lịch bác sĩ')
@section('content')
<x-table-list-component
    :title="'Danh sách đặt lịch'"
    :route="route('admin.doctors.search')"
    :columns="[
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'doctor_name', 'label' => 'Họ và Tên'],
        ['key' => 'time_start', 'label' => 'Giờ bắt đầu'],
        ['key' => 'time_end', 'label' => 'Giờ kết thúc'],
        ['key' => 'working_date', 'name'=>'approve', 'label' => 'Ngày làm việc'],
        ['key' => 'max_patients', 'label' => 'Số lượng bệnh nhân tối đa'],
        ['key' => 'status', 'name'=>'status', 'label' => 'Trạng thái'],
    ]"

    :data="$data"
    {{-- :selects="$selects" --}}
    :actions="[
        [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.schedule.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Chỉnh sửa',
            'route' => fn($id) => route('admin.schedule.edit', $id),
            'method' => 'GET',
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.schedule.delete', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
    ]"
/>

@endsection