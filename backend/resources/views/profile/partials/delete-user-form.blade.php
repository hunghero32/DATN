<div class="card">
    <h5 class="card-header">Xóa Tài Khoản</h5>
    <div class="card-body">
        <form method="post" action="{{ route('profile.destroy') }}" class="p-3" id="deleteAccountForm">
            @csrf
            @method('delete')

            <div class="mb-3">
                <label for="password" class="form-label">Mật Khẩu</label>
                <input
                    type="password"
                    class="form-control"
                    id="password"
                    name="password"
                    placeholder="Nhập mật khẩu của bạn" />
                @if($errors->userDeletion->has('password'))
                <div class="text-danger mt-1">
                    {{ $errors->userDeletion->first('password') }}
                </div>
                @endif
            </div>

            <div class="form-check mb-3">
                <input
                    class="form-check-input"
                    type="checkbox"
                    id="accountActivation"
                    name="accountActivation" />
                <label class="form-check-label" for="accountActivation">
                    Xác nhận xóa tài khoản
                </label>
            </div>

            <div class="d-flex justify-content-end">
                <button
                    type="button"
                    class="btn btn-secondary me-3"
                    onclick="window.history.back()">Trở về</button>
                <button type="submit" class="btn btn-danger">Xóa Tài Khoản</button>
            </div>
        </form>
    </div>
</div>

<script>
    document.getElementById('deleteAccountForm').addEventListener('submit', function(e) {
        const checkbox = document.getElementById('accountActivation');
        if (!checkbox.checked) {
            e.preventDefault(); // Ngăn không cho gửi form
            alert('Bạn phải tick xác nhận xóa tài khoản');
        }
    });
</script>