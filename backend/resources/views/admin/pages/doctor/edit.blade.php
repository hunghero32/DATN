<x-form
    :action="route('admin.doctors.update', $data->id)"
    method="PUT"
    :fields="[
        ['name' => 'doctor_avatar', 'label' => 'Ảnh', 'type' => 'image'],
        ['name' => 'doctor_name', 'label' => 'Họ và tên', 'type' => 'text'],
        ['name' => 'doctor_bio', 'label' => 'Thông tin', 'type' => 'textarea'],
        ['name' => 'specialty_id', 'label' => 'Chuyên khoa', 'type' => 'select', 'options' => $specialties],
        ['name' => 'exp', 'label' => 'Kinh nghiệm (năm)', 'type' => 'text'],
        ['name' => 'file', 'label' => 'Tải lên (CV, Chứng chỉ)', 'type' => 'file'],
    ]"
    :data="$data"
/>
