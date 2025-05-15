@extends('admin.index')
@section('title', 'Quản lý đặt lịch')
@section('content')

@php

    // Add status configuration
    $statusConfig = [
        'route' => 'admin.bookings.update-status',
        'states' => config('common.order_statuses')
    ];

    $detailModal=[
        'fields'=>[
            ['name'=>'doctor_name','label'=>'Bác sĩ','type'=>'text'],
            ['name'=>'guest_name','label'=>'Khách hàng','type'=>'text'],
            ['name'=>'service_name','label'=>'Dịch vụ','type'=>'text'],
            ['name'=>'service_price','label'=>'Giá dịch vụ','type'=>'text'],
            ['name'=>'booking_date','label'=>'Ngày hẹn','type'=>'text'],
            ['name'=>'booking_time','label'=>'Giờ hẹn','type'=>'text'],
            ['name'=>'status','label'=>'Trạng thái','type'=>'text'],
            ['name'=>'created_at','label'=>'Ngày tạo','type'=>'text'],
        ]
    ];
@endphp

<x-table-list-component
    :title="'Danh sách đặt lịch'"
    :route="route('admin.bookings.search')"
    :columns="[
        ['key' => 'doctor_name', 'label' => 'Bác sĩ'],
        ['key' => 'guest_name', 'label' => 'Bệnh nhân'],
        ['key' => 'service_name', 'label' => 'Dịch vụ'],
        ['key' => 'booking_date', 'label' => 'Ngày hẹn'],
        ['key' => 'booking_time', 'label' => 'Giờ hẹn'],
        ['key' => 'status', 'name' => 'status', 'label' => 'Trạng thái', 'status_config' => $statusConfig],
        ['key' => 'created_at', 'label' => 'Ngày tạo'],
    ]"
    :data="$data"
    :detailModal="$detailModal"
    :filters="[
        [
            'type' => 'text',
            'name' => 'search',
            'placeholder' => 'Tìm kiếm...',
            'class' => 'form-control'
        ],
        [
            'type' => 'date',
            'name' => 'date_from',
            'placeholder' => 'Từ ngày',
            'class' => 'form-control'
        ],
        [
            'type' => 'date',
            'name' => 'date_to',
            'placeholder' => 'Đến ngày',
            'class' => 'form-control'
        ]
    ]"
    :selects="[
        [
            'id' => 'doctor_id',
            'name' => 'doctor_id',
            'class' => 'select-search',
            'options' => ['all' => 'Tất cả bác sĩ'] + ($doctors ?? [])
        ],
        [
            'id' => 'status',
            'name' => 'status',
            'class' => 'select-search',
            'options' => ['all' => 'Tất cả trạng thái'] + (config('app.statuses') ?? [])
        ]
    ]"
    :actions="[
         [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.bookings.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.bookings.delete', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
        [
            'label' => 'Chi tiết',
            'route' => fn($id) => '#',
            'method' => 'GET',
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm',
            'attributes' => [
                'data-bs-toggle' => 'modal',
                'data-bs-target' => fn($id) => '#detailModal' . $id,
            ],
        ]
    ]"
/>

@endsection

