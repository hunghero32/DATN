<x-form
    :action="route('admin.services.update', $data->id)"
    method="PUT"
    :fields="[
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' =>  $specialties],
        ['name' => 'services_name', 'label' => '* Tên dịch vụ', 'type' => 'text'],
        ['name' => 'price', 'label' => '* Giá', 'type' => 'number', 'attributes' => ['step' => '1000']],
        ['name' => 'duration', 'label' => '* Thời gian thực hiện (phút)', 'type' => 'number'],
        ['name'=>'image','label'=>'Ảnh','type'=>'file'],
        ['name' => 'description', 'label' => 'Mô tả', 'type' => 'textarea'],
    ]"
    :data="$data"
/>
