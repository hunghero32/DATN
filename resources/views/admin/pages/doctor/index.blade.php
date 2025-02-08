@extends('admin.index')
@section('title', 'Thông tin bác sĩ')
@section('content')
<x-table-list-component
:columns="[
    ['key' => 'id', 'label' => 'ID'],
    ['key' => 'doctor_name', 'label' => 'Họ và Tên'],
    ['key' => 'doctor_avatar', 'label' => 'Ảnh đại diện'],
    ['key' => 'exp', 'label' => 'Kinh nghiệm'],
    ['key'=>'created_at', 'label'=>'Ngày tạo'],


]"
:data="$data"
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
        'label' => 'Cập nhật trạng thái',
        // 'route' => fn($id) => route(),
        'method' => 'GET',
        'type' => 'row',
        'class' => 'btn btn-primary btn-sm'
    ],
    [
        'label' => 'Xóa',
        'route' => fn($id) => route('admin.doctors.delete', $id),
        'method' => 'DELETE',
        'type' => 'row',
        'confirm' => 'Bạn có chắc muốn xóa?',


    ],
]"
/>

@endsection
