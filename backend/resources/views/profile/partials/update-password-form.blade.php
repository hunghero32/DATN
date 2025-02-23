<div class="card">
    <h5 class="card-header">Đổi Mật Khẩu</h5>
    <div class="card-body">
        <form method="post" action="{{ route('password.update') }}" class="mt-6">
            @csrf
            @method('put')

            <!-- Trường mật khẩu hiện tại -->
            <div class="mb-3">
                <label for="update_password_current_password" class="form-label">Mật khẩu hiện tại</label>
                <input id="update_password_current_password" name="current_password" type="password" class="form-control" autocomplete="current-password" />
                @if ($errors->updatePassword->has('current_password'))
                <div class="text-danger mt-2">
                    {{ $errors->updatePassword->first('current_password') }}
                </div>
                @endif
            </div>

            <!-- Trường mật khẩu mới -->
            <div class="mb-3">
                <label for="update_password_password" class="form-label">Mật khẩu mới</label>
                <input id="update_password_password" name="password" type="password" class="form-control" autocomplete="new-password" />
                @if ($errors->updatePassword->has('password'))
                <div class="text-danger mt-2">
                    {{ $errors->updatePassword->first('password') }}
                </div>
                @endif
            </div>

            <!-- Trường xác nhận mật khẩu -->
            <div class="mb-3">
                <label for="update_password_password_confirmation" class="form-label">Xác nhận mật khẩu</label>
                <input id="update_password_password_confirmation" name="password_confirmation" type="password" class="form-control" autocomplete="new-password" />
                @if ($errors->updatePassword->has('password_confirmation'))
                <div class="text-danger mt-2">
                    {{ $errors->updatePassword->first('password_confirmation') }}
                </div>
                @endif
            </div>

            <!-- Nút lưu và thông báo thành công -->
            <div class="d-flex justify-content-between">
                <button type="submit" class="btn btn-primary">Lưu</button>

                @if (session('status') === 'password-updated')
                <p class="text-success">
                    Đã lưu.
                </p>
                @endif
            </div>
        </form>
    </div>
</div>
