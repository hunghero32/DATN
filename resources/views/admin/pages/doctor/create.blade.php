<x-form
    :action="route('admin.doctors.store')"
    method="POST"
    :fields="[
        ['name' => 'doctor_avatar', 'label' => 'Ảnh', 'type' => 'image'],
        ['name' => 'doctor_name', 'label' => 'Họ và tên', 'type' => 'text'],
        ['name' => 'doctor_bio', 'label' => 'Thông tin', 'type' => 'textarea'],
        ['name' => 'clinic_id', 'label' => 'Phòng khám', 'type' => 'select', 'options' => ['' => 'Lựa chọn phòng khám'] + $clinics],
        ['name' => 'specialty_id', 'label' => 'Chuyên khoa', 'type' => 'select', 'options' => ['' => 'Lựa chọn chuyên khoa'] + $specialties],
        ['name' => 'exp', 'label' => 'Kinh nghiệm (năm)', 'type' => 'text'],
        ['name' => 'file', 'label' => 'Tải lên (CV, Chứng chỉ)', 'type' => 'file'],
        ['name' => 'approve', 'label' => 'Trạng thái phê duyệt', 'type' => 'select', 'options' => ['0' => 'Chờ duyệt', '1' => 'Đã duyệt']]
    ]"
      :data="old()"
/>
