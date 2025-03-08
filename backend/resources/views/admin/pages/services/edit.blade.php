<x-form
    :action="route('admin.services.update', $data->id)"
    method="PUT"
    :fields="[
        ['name' => 'specialty_id', 'label' => '* Chuyên khoa', 'type' => 'select', 'options' =>  $specialties],
        ['name' => 'category_id', 'label' => '* Danh mục', 'type' => 'select', 'options' =>  $categories],
        ['name' => 'services_name', 'label' => '* Tên dịch vụ', 'type' => 'text'],
        ['name' => 'status','label'=>'Trạng thái','type'=>'select','options'=>[0=>'Không hoạt động',1=>'Hoạt động']],
        ['name'=>'image','label'=>'Ảnh','type'=>'file'],
        ['name' => 'price', 'label' => '* Giá', 'type' => 'number', 'attributes' => ['step' => '1000']],
        ['name' => 'duration', 'label' => '* Thời gian thực hiện (phút)', 'type' => 'number'],
        ['name' => 'description', 'label' => 'Mô tả', 'type' => 'textarea'],
    ]"
    :data="$data"
/>
