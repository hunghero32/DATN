<x-form
    :action="route('admin.schedule.update', $data->id)"
    method="PUT"
    :fields="[
        ['name' => 'doctor_id', 'label' => 'Bác sĩ', 'type' => 'select', 'options' => $doctors],
        ['name' => 'time_start', 'label' => 'Giờ bắt đầu', 'type' => 'time'],
        ['name' => 'time_end', 'label' => 'Giờ kết thúc', 'type' => 'time'],
        ['name' => 'working_date', 'label' => 'Ngày làm việc', 'type' => 'date'],
        ['name' => 'max_patients', 'label' => 'Số lượng bệnh nhân tối đa', 'type' => 'number'],
        ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [1 => 'Hoạt động', 0 => 'Không hoạt động']],
    ]"
    :data="$data"
/>
