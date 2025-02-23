<div class="card">
    <h5 class="card-header">Thông tin hồ sơ</h5>
    <div class="card-body">
    <!-- Form xác minh -->
    <form id="send-verification" method="post" action="{{ route('verification.send') }}">
        @csrf
    </form>

    <!-- Form cập nhật hồ sơ -->
    <form method="post" action="{{ route('profile.update') }}" class="mt-6 space-y-6">
        @csrf
        @method('patch')

        <div class="mb-3">
            <label for="name" class="form-label">Tên</label>
            <input id="name" name="name" type="text" class="form-control" value="{{ old('name', $user->name) }}" required autofocus autocomplete="name" />
            @if ($errors->has('name'))
                <div class="text-danger mt-2">
                    {{ $errors->first('name') }}
                </div>
            @endif
        </div>

        <div class="mb-3">
                <label for="phone" class="form-label">Số điện thoại</label>
                <input id="phone" name="phone" type="text" class="form-control" value="{{ old('phone', $user->phone) }}" autocomplete="phone" />
                @if ($errors->has('phone'))
                    <div class="text-danger mt-2">
                        {{ $errors->first('phone') }}
                    </div>
                @endif
            </div>

        <div class="mb-3">
            <label for="email" class="form-label">Email</label>
            <input id="email" name="email" type="email" class="form-control" value="{{ old('email', $user->email) }}" required autocomplete="username" />
            @if ($errors->has('email'))
                <div class="text-danger mt-2">
                    {{ $errors->first('email') }}
                </div>
            @endif

            @if ($user instanceof \Illuminate\Contracts\Auth\MustVerifyEmail && !$user->hasVerifiedEmail())
                <div class="mt-2">
                    <p class="text-sm text-warning">
                        Địa chỉ email của bạn chưa được xác minh.
                        <button form="send-verification" class="btn btn-link">Nhấn vào đây để gửi lại email xác minh.</button>
                    </p>

                    @if (session('status') === 'verification-link-sent')
                        <p class="mt-2 font-medium text-sm text-success">
                            Một liên kết xác minh mới đã được gửi đến địa chỉ email của bạn.
                        </p>
                    @endif
                </div>
            @endif
        </div>

        <div class="d-flex justify-content-between">
            <button type="submit" class="btn btn-primary">{{ __('Lưu') }}</button>

            @if (session('status') === 'profile-updated')
                <p class="text-sm text-success">
                    Đã lưu.
                </p>
            @endif
        </div>
    </form>
    </div>
</div>

