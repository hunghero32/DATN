<x-form
    :action="route('admin.medical_records.store')"
    method="POST"
    :fields="[
        ['name' => 'guest_id', 'label' => '* Bệnh nhân', 'type' => 'select', 'options' => ['' => 'Chọn bệnh nhân'] + $guests],
        ['name' => 'BHYT', 'label' => '* Bảo hiểm y tế', 'type' => 'text'],
        ['name' => 'medical_condition', 'label' => '* Tình trạng bệnh', 'type' => 'text'],
        ['name' => 'medications', 'label' => 'Thuốc đang sử dụng', 'type' => 'text'],
        ['name' => 'allergies', 'label' => 'Dị ứng', 'type' => 'text'],
        ['name' => 'family_history', 'label' => 'Tiền sử gia đình', 'type' => 'text'],
        ['name' => 'treatment', 'label' => '* Phác đồ điều trị', 'type' => 'text'],
        ['name' => 'note', 'label' => 'Ghi chú', 'type' => 'text'],
    ]"
    :data="old()"
/>
