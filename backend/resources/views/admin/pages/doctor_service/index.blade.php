@extends('admin.index')
@section('title', 'Thông tin dịch vụ cho bác sĩ')
@section('content')
@php
    $doctors = App\Models\Doctor::pluck('doctor_name', 'id')->toArray();
    $services = App\Models\Services::pluck('services_name', 'id')->toArray();

    $selects = [
        [
            'id' => 'doctor_id',
            'name' => 'doctor_id',
            'class' => 'select-search',  // Add this line
            'options' => ['all' => 'Tất cả bác sĩ'] + (!empty($doctors) ? $doctors : [])
        ],
        [
            'id' => 'service_id',
            'name' => 'service_id',
            'class' => 'select-search',  // Add this line
            'options' => ['all' => 'Tất cả dịch vụ'] + (!empty($services) ? $services : [])
        ],
    ];

    // Add error logging to debug
    if (empty($doctors)) {
        \Log::warning('No doctors found in doctor-service index');
    }
    if (empty($services)) {
        \Log::warning('No services found in doctor-service index');
    }

    $detailModal = [
        'fields' => [
           ['name' => 'doctor_name', 'label' => 'Họ và tên bác sĩ'],
           ['name' => 'services_name', 'label' => 'Tên dịch vụ'],
           ['name' => 'created_at', 'label' => 'Ngày tạo'],
        ]
    ];
@endphp

<x-table-list-component
    :title="'Dịch vụ cho bác sĩ'"
    :route="route('admin.doctor_service.search')"
    :columns="[
        ['key' => 'doctor_name', 'label' => 'Họ và tên bác sĩ'],
        ['key' => 'services_name', 'label' => 'Tên dịch vụ'],
        ['key' => 'created_at', 'label' => 'Ngày tạo'],
    ]"
    :data="$data"
    :selects="$selects"
    :detailModal="$detailModal"
    :actions="[
        [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.doctor_service.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Chỉnh sửa',
            'route' => fn($id) => route('admin.doctor_service.edit', $id),
            'method' => 'GET',
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.doctor_service.destroy', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
    ]"
/>
@endsection
