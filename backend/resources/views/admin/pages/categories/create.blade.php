@extends('admin.index')
@section('title', 'Tạo mới')
@section('content')
<div class="content-wrapper">

    <!-- Content -->

    <div class="container-xxl flex-grow-1 container-p-y">
      <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Settings /</span> Thêm danh muc</h4>

      <div class="row">
        <div class="col-md-12">
          <div class="card mb-4">
            <h5 class="card-header">Profile Details</h5>
            <!-- Account -->

            <hr class="my-0" />
            <div class="card-body">
              <form action="{{route('admin.categories.store')}}"  method="POST">

                @csrf
                <div class="row mt-3">

                  <div class="mb-3 col-md-6">
                    <label for="address" class="form-label">danh mụcmục</label>
                    <input type="text" class="form-control" id="name" name="name" placeholder="name" />
                  </div>
                    <label for="state" class="form-label">description
                    </label>
                    <textarea name="description" id=""></textarea>




                </div>
                <div class="mt-2">
                  <button  class="btn btn-primary me-2">Lưu thay đổi</button>
                  <button type="reset" class="btn btn-outline-secondary">Quay lại</button>
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
@endsection
