@extends('admin.index')
@section('title', 'Danh sách dịch vụ')
@section('content')
<?php
$specialties = $data->pluck('specialty_id', 'specialty_name')->toArray();
$categories = $data->pluck('category_id', 'category_name')->toArray();
$detailModal=[
    'fields'=>[
        ['name' => 'specialty_id', 'label' => 'Chuyên khoa', 'type' => 'select', 'options' => $specialties],
        ['name' => 'category_id', 'label' => 'Danh mục', 'type' => 'select', 'options' => $categories],
        ['name' => 'services_name', 'label' => 'Tên dịch vụ', 'type' => 'text'],
        ['name' => 'price', 'label' => 'Giá', 'type' => 'number'],
        ['name' => 'duration', 'label' => 'Thời gian thực hiện', 'type' => 'number'],
        ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động', 1 => 'Hoạt động']],
    ]
];
?>
<x-table-list-component
    :title="'Danh sách dịch vụ'"
    :route="route('admin.services.search')"
    :columns="[
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'specialty_name', 'label' => 'Tên Chuyên khoa'],
        ['key' => 'category_name', 'label' => 'Tên Danh mục'],
        ['key' => 'services_name', 'label' => 'Tên dịch vụ'],
        ['key' => 'price', 'label' => 'Giá'],
        ['key' => 'duration', 'label' => 'Thời gian thực hiện'],
        ['key' => 'status','name'=>'status' ,'label' => 'Trạng thái'],
    ]"
    :selects="[
        [
            'id' => 'status',
            'name' => 'status',
            'options' => $statuses
        ]
    ]"
    :data="$data"
    :detailModal="$detailModal"
    :actions="[
        [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.services.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Chỉnh sửa',
            'route' => fn($id) => route('admin.services.edit', $id),
            'method' => 'GET',
<<<<<<< HEAD
            'modal' => true,
=======
>>>>>>> 8ff85ea459e84e5c05aaa434423a1a0ee58bc5a6
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
        ],
        [
            'label' => 'Xem chi tiết',
            'route' => fn($id) => route('admin.services.show', $id),
            'method' => 'GET',
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-info btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.services.delete', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
    ]"
/>
@endsection
