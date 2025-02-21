@extends('admin.index')
@section('title', 'Thông tin danh muc ')
@section('content')
    <div class="content-wrapper">
        <!-- Content -->

        <div class="container-xxl flex-grow-1 container-p-y">
            <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Tables /</span> CATEGORIES</h4>
            <div class="text-end">
                <a href="{{route('admin.categories.create')}}" class="btn btn-success">Thêm mới</a>
            </div>
            <div class="card mt-3">
                <div class="table-responsive text-nowrap">
                    <table class="table  table-bordered">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>description</th>

                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody class="table-border-bottom-0">
                            @foreach ($listCategory as $key =>$value)



                                    <tr>
                                <td>
                                    <i class="fab fa-bootstrap fa-lg text-primary me-3"></i> <strong>ID
                                        {{$key+1}}</strong>
                                </td>
                                <td>{{$value->name}}</td>
                                <td>
                                    <ul class="list-unstyled users-list m-0 avatar-group d-flex align-items-center">
                                        <textarea>  {{$value->description}}</textarea>

                                    </ul>
                                </td>
                                <td>
                                    <span class="badge bg-label-warning me-1">Pending</span>

                                    <div class="dropdown">
                                        <button type="button" class="btn p-0 dropdown-toggle hide-arrow"
                                            data-bs-toggle="dropdown">
                                            <i class="bx bx-dots-vertical-rounded"></i>
                                        </button>
                                        <div class="dropdown-menu">
                                            <a class="dropdown-item" href="{{route('admin.categories.edit',$value->id)}}"><i
                                                    class="bx bx-edit-alt me-2"></i> Edit</a>
                                                    <form action="{{route('admin.categories.delete',$value->id)}}" method="POST">
                                                        @method('DELETE')
                                                        @csrf
                                                        <button onclick="return confirm('Ban co muon xoa ko')"  ><i
                                                            class="bx bx-trash me-2"></i> Delete</button>

                                                    </form>

                                        </div>
                                    </div>
                                </td>
                            </tr>
                            @endforeach


                        </tbody>
                    </table>
                </div>
            </div>
        </div>

        <div class="content-backdrop fade"></div>
    </div>
@endsection
