<x-form
    :action="route('admin.services.store')"
    method="POST"
    :fields="[
        ['name' => 'specialty_id', 'label' => 'Chuyên khoa', 'type' => 'select', 'options' => ['' => 'Chọn chuyên khoa'] + $specialties],
        ['name' => 'category_id', 'label' => 'Danh mục', 'type' => 'select', 'options' => ['' => 'Chọn danh mục'] + $categories],
        ['name' => 'services_name', 'label' => 'Tên dịch vụ', 'type' => 'text'],
        ['name' => 'description', 'label' => 'Mô tả', 'type' => 'textarea'],
        ['name' => 'price', 'label' => 'Giá', 'type' => 'number', 'attributes' => ['step' => '1000']],
        ['name' => 'duration', 'label' => 'Thời gian thực hiện (phút)', 'type' => 'number'],
    ]"
    :data="old()"
/>
