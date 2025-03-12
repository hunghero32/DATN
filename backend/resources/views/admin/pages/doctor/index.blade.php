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
        ],
        [
            'id' => 'status',
            'name' => 'approve',
            'options' => [
                'all' => 'Tất cả',
                '1' => 'Hoạt động',
                '0' => 'Không hoạt động',
            ]
        ],
    ];

    $specialties = $data->pluck('specialty_id', 'specialty_name')->toArray();

    // Add status configuration
    $statusConfig = [
        'route' => 'admin.doctors.update-status',
        'states' => [
            '1' => [
                'text' => 'Hoạt động',
                'class' => 'badge bg-success'
            ],
            '0' => [
                'text' => 'Không hoạt động',
                'class' => 'badge bg-danger'
            ]
        ]
    ];

    $detailModal = [
        'fields' => [
            ['name' => 'doctor_avatar', 'label' => 'Ảnh đại diện', 'type' => 'avatar'],
            ['name' => 'doctor_name', 'label' => 'Họ và tên', 'type' => 'text'],
            ['name' => 'specialty_id', 'label' => 'Chuyên khoa', 'type' => 'select', 'options' => $specialties],
            ['name' => 'exp', 'label' => 'Kinh nghiệm (năm)', 'type' => 'text'],
            ['name' => 'approve', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động', 1 => 'Hoạt động']],
            ['name' => 'file', 'label' => 'Tải lên (CV, Chứng chỉ)', 'type' => 'file'],
            ['name' => 'doctor_bio', 'label' => 'Thông tin', 'type' => 'textarea'],
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
        ['key' => 'status', 'name' => 'approve', 'label' => 'Trạng thái', 'status_config' => $statusConfig],
        ['key' => 'created_at', 'label' => 'Ngày tạo'],
    ]"
    :data="$data"
    :selects="$selects"
    :detailModal="$detailModal"
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
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
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
