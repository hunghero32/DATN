<x-form
    :action="route('admin.doctors.update', $data->id)"
    method="PUT"
    :fields="[

        ['name' => 'doctor_avatar', 'label' => '* Ảnh', 'type' => 'avatar'],
        ['name' => 'doctor_name', 'label' => '* Họ và tên', 'type' => 'text'],
        ['name' => 'user_id', 'label' => '* Tài khoản bác sĩ', 'type' => 'select', 'options' => ['' => 'Chọn tài khoản'] + $doctors->pluck('name', 'id')->toArray()],
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' => $specialties],
        ['name' => 'exp', 'label' => '* Kinh nghiệm (năm)', 'type' => 'text'],
        ['name' => 'approve', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động', 1 => 'Hoạt động']],
        ['name' => 'doctor_bio', 'label' => '* Thông tin', 'type' => 'textarea'],
        ['name' => 'file', 'label' => '* Tải lên (CV, Chứng chỉ)', 'type' => 'file'],

    ]"
    :data="$data"
/>
