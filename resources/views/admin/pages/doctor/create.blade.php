<x-form
    :action="route('admin.doctors.store')"
    method="POST"
    :fields="[
        ['name' => 'doctor_avatar', 'label' => 'Ảnh', 'type' => 'image'],
        ['name' => 'doctor_name', 'label' => 'Họ và tên', 'type' => 'text'],
        ['name' => 'doctor_bio', 'label' => 'Thông tin', 'type' => 'textarea'],
        ['name' => 'clinic_id', 'label' => 'Clinic ID', 'type' => 'text'],
        ['name' => 'specialty_id', 'label' => 'Specialty ID', 'type' => 'text'],
        ['name' => 'exp', 'label' => 'Experience (Years)', 'type' => 'text'],
        ['name' => 'file', 'label' => 'Upload File (CV, Certificate)', 'type' => 'file'],
        ['name' => 'approve', 'label' => 'Approval Status', 'type' => 'select', 'options' => ['0' => 'Pending', '1' => 'Approved']]
    ]"
    :data="old()"
/>
