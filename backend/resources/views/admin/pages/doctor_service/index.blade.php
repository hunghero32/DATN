@extends('admin.index')
@section('title', 'Thông tin dịch vụ cho bác sĩ')
@section('content')
@php
$detailModal = [
        'fields' => [
           ['name' => 'doctor_name', 'label' => 'Họ và tên bác sĩ'],
           ['name' => 'service_name', 'label' => 'Tên dịch vụ'],
           ['name' => 'created_at', 'label' => 'Ngày tạo'],
        ]
    ];
@endphp
<x-table-list-component
    :title="'Dịch vụ cho bác sĩ'"
    :columns="[
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'doctor_name', 'label' => 'Họ và tên bác sĩ'],
        ['key' => 'services_name', 'label' => 'Tên dịch vụ'],
        ['key' => 'created_at', 'label' => 'Ngày tạo'],
    ]"
    :data="$data"
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
