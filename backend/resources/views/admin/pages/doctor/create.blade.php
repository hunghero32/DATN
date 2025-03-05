<x-form
   :action="route('admin.doctors.store')"
    method="POST"
    :fields="[
        ['name' => 'doctor_avatar', 'label' => '* Ảnh', 'type' => 'avatar'],
        ['name' => 'doctor_name', 'label' => '* Họ và tên', 'type' => 'text'],
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' => ['' => 'Lựa chọn chuyên khoa'] + $specialties],
        ['name' => 'doctor_bio', 'label' => '* Thông tin', 'type' => 'textarea'],
        ['name' => 'exp', 'label' => '* Kinh nghiệm (năm)', 'type' => 'text'],
        ['name' => 'approve', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động']],
        ['name' => 'file', 'label' => '* Tải lên (CV, Chứng chỉ)', 'type' => 'file'],

    ]"
    :data="old()"
/>
