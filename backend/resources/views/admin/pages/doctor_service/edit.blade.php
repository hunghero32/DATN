<x-form
:action="route('admin.doctor_service.update',$doctorService->id)"
method="PUT"
:fields="[
    ['name' => 'doctor_id',
     'label' => '* Bác sĩ',
     'type' => 'select',
     'required' => true,
     'options' =>  $doctors->pluck('doctor_name', 'id')->toArray()],
    ['name' => 'service_id',
     'label' => '* Dịch vụ',
     'type' => 'select',
     'required' => true,
     'options' => $services->pluck('services_name', 'id')->toArray()]
]"
:data="$doctorService"
/>
