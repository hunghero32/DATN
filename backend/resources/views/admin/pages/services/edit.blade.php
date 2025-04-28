<x-form
    :action="route('admin.services.update', $data->id)"
    method="PUT"
    :fields="[
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' =>  $specialties],
        ['name' => 'services_name', 'label' => '* Tên dịch vụ', 'type' => 'text'],
        ['name' => 'price', 'label' => '* Giá', 'type' => 'number','is_price' => true, 'attributes' => ['step' => '1000']],
        ['name' => 'duration', 'label' => '* Thời gian thực hiện (phút)', 'type' => 'number'],
        ['name'=>'image','label'=>'Ảnh','type'=>'file'],
        ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [1 => 'Hiển thị', 0 => 'Ẩn']],
        ['name' => 'description', 'label' => 'Mô tả', 'type' => 'textarea'],
    ]"
    :data="$data"
/>
