@extends('admin.index')
@section('title', 'Thông tin bác sĩ')
@section('content')

@php
    $selects = [
    [
        'id' => 'exp',
        'name' => 'exp',
        'options' => [
            'all' => 'Tất cả',
            '0-5' => '0 - 5 năm',
            '6-10' => '6 - 10 năm',
            '10+' => 'Trên 10 năm',
        ]
    ]
];
@endphp

<x-table-list-component
    :title="'Bác sĩ'"
    :route="route('admin.doctors.search')"
    :columns="[
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'doctor_name', 'label' => 'Họ và Tên'],
        ['key' => 'doctor_avatar', 'label' => 'Ảnh đại diện'],
        ['key' => 'exp', 'label' => 'Kinh nghiệm (Năm)'],
        ['key' => 'status', 'name'=>'approve', 'label' => 'Trạng thái'],
        ['key' => 'created_at', 'label' => 'Ngày tạo'],
    ]"

    :data="$data"
    :selects="$selects"
    :actions="[
        [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.doctors.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Chỉnh sửa',
            'route' => fn($id) => route('admin.doctors.edit', $id),
            'method' => 'GET',
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.doctors.delete', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
    ]"
/>

@endsection
