<x-form
   :action="route('admin.doctors.store')"
    method="POST"
   :backRoute="route('admin.doctors.index')"
    :fields="[
        ['name' => 'doctor_avatar', 'label' => '* Ảnh', 'type' => 'avatar'],
        ['name' => 'doctor_name', 'label' => '* Họ và tên', 'type' => 'text'],
        ['name'=>'email', 'label' => '* Email', 'type' => 'text'],
        ['name'=>'password', 'label' => '* Mật khẩu', 'type' => 'password'],
        ['name'=>'phone', 'label' => '* Số điện thoại', 'type' => 'text'],
        ['name' => 'exp', 'label' => '* Kinh nghiệm (năm)', 'type' => 'number'],
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' => ['' => 'Lựa chọn chuyên khoa'] + $specialties],
        ['name' => 'doctor_bio', 'label' => '* Thông tin', 'type' => 'textarea'],
        ['name' => 'file', 'label' => 'Tải lên (CV, Chứng chỉ)', 'type' => 'file'],
    ]"
    :data="old()"
/>
