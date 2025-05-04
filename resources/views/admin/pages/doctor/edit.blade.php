<x-form
    :action="route('admin.doctors.update', $data->id)"
    method="PUT"
    :backRoute="route('admin.doctors.index')"
    :fields="[
        ['name' => 'doctor_avatar', 'label' => '* Ảnh', 'type' => 'avatar', 'value' => $data->doctor_avatar ?? ''],
        ['name' => 'doctor_name', 'label' => '* Họ và tên', 'type' => 'text', 'value' => $data->doctor_name ?? ''],
        ['name' => 'email', 'label' => '* Email', 'type' => 'text', 'value' => $data->email ?? ''],
        ['name' => 'phone', 'label' => '* Số điện thoại', 'type' => 'number', 'value' => $data->phone ?? ''],
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' => $specialties, 'value' => $data->specialty_id],
        ['name' => 'exp', 'label' => '* Kinh nghiệm (năm)', 'type' => 'number', 'value' => $data->exp ?? ''],
        ['name' => 'approve', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động', 1 => 'Hoạt động'], 'value' => $data->approve],
        ['name' => 'doctor_bio', 'label' => '* Thông tin', 'type' => 'textarea', 'value' => $data->doctor_bio ?? ''],
        ['name' => 'file', 'label' => 'Tải lên (CV, Chứng chỉ)', 'type' => 'file', 'value' => $data->file ?? ''],
        ['name' => 'password', 'label' => 'Mật khẩu mới (để trống nếu không đổi)', 'type' => 'text'],
    ]"
    :data="$data"
/>
