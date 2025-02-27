@extends('admin.index')
@section('title', 'Quản lý đặt lịch')
@section('content')

@php
    // $selects = [
    //     [
    //         'id' => 'status',
    //         'name' => 'status',
    //         'options' => [
    //             'all' => 'Tất cả',
    //             'pending' => 'Đang chờ',
    //             'confirmed' => 'Đã xác nhận',
    //             'completed' => 'Hoàn thành',
    //             'canceled' => 'Đã hủy',
    //         ]
    //     ]
    // ];
@endphp

<x-table-list-component
    :title="'Danh sách đặt lịch'"
    {{-- :route="route('admin.bookings.search')" --}}
    :columns="[
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'doctor_name', 'label' => 'Bác sĩ'],
        ['key' => 'services_name', 'label' => 'Dịch vụ'],
        ['key' => 'guest_name', 'label' => 'Khách hàng'],
        ['key' => 'booking_date', 'label' => 'Ngày hẹn'],
        ['key' => 'booking_time', 'label' => 'Giờ hẹn'],
        ['key' => 'status','name'=>'status', 'label' => 'Trạng thái'],
        ['key' => 'created_at', 'label' => 'Ngày tạo'],
    ]"

    :data="$data"
    {{-- :selects="$selects" --}}
    :actions="[
        [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.bookings.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Chỉnh sửa',
            'route' => fn($id) => route('admin.bookings.edit', $id),
            'method' => 'GET',
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.bookings.delete', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
    ]"
/>

@endsection

