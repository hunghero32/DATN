<x-form
:action="route('admin.doctor_service.store')"
method="POST"
:fields="[
    ['name' => 'doctor_id',
     'label' => '* Bác sĩ',
     'type' => 'select',
     'required' => true,
     'options' => [''=>'Lựa chọn họ và tên bác sĩ'] + $doctors->pluck('doctor_name', 'id')->toArray()],
    ['name' => 'service_id',
     'label' => '* Dịch vụ',
     'type' => 'select',
     'required' => true,
     'options' => [''=>'Lựa chọn dịch vụ'] + $services->pluck('services_name', 'id')->toArray()]
]"
:data="old()"
/>
