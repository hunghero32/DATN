<x-form
   :action="route('admin.doctors.store')"
    method="POST"
    :fields="[

        ['name' => 'doctor_avatar', 'label' => '* Ảnh', 'type' => 'avatar'],
        ['name' => 'doctor_name', 'label' => '* Họ và tên', 'type' => 'text'],
        ['name' => 'user_id', 'label' => '* Tài khoản bác sĩ', 'type' => 'select', 'options' => ['' => 'Chọn tài khoản'] + $doctors->pluck('name', 'id')->toArray()],
        ['name' => 'exp', 'label' => '* Kinh nghiệm (năm)', 'type' => 'text'],
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' => ['' => 'Lựa chọn chuyên khoa'] + $specialties],
        ['name' => 'doctor_bio', 'label' => '* Thông tin', 'type' => 'textarea'],
        ['name' => 'file', 'label' => '* Tải lên (CV, Chứng chỉ)', 'type' => 'file'],
    ]"
    :data="old()"
/>
