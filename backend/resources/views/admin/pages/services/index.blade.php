@extends('admin.index')
@section('title', 'Danh sách dịch vụ')
@section('content')
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

    :data="$data"
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
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
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
