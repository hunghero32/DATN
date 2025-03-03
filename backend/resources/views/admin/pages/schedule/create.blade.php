<x-form
    :action="route('admin.schedule.store')"
    method="POST"
    :fields="[
        ['name' => 'doctor_id', 'label' => '*Bác sĩ', 'type' => 'select', 'options' => ['' => 'Chọn bác sĩ'] + $doctors],
        ['name' => 'time_start', 'label' => '* Giờ bắt đầu', 'type' => 'time'],
        ['name' => 'time_end', 'label' => '* Giờ kết thúc', 'type' => 'time'],
        ['name' => 'working_date', 'label' => '* Ngày làm việc', 'type' => 'date'],
        ['name' => 'max_patients', 'label' => '* Số lượng bệnh nhân tối đa', 'type' => 'number'],
        ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động']],
    ]"
    :data="old()"
/>
