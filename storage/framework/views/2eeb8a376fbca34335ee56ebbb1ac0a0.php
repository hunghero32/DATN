<?php if (isset($component)) { $__componentOriginal18ad2e0d264f9740dc73fff715357c28 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal18ad2e0d264f9740dc73fff715357c28 = $attributes; } ?>
<?php $component = App\View\Components\Form::resolve(['action' => route('admin.schedule.store'),'method' => 'POST','fields' => [
        ['name' => 'doctor_id', 'label' => 'Bác sĩ', 'type' => 'select', 'options' => ['' => 'Chọn bác sĩ'] + $doctors],
        ['name' => 'time_start', 'label' => 'Giờ bắt đầu', 'type' => 'time'],
        ['name' => 'time_end', 'label' => 'Giờ kết thúc', 'type' => 'time'],
        ['name' => 'working_date', 'label' => 'Ngày làm việc', 'type' => 'date'],
        ['name' => 'max_patients', 'label' => 'Số lượng bệnh nhân tối đa', 'type' => 'number'],
        ['name' => 'status', 'label' => 'Trạng thái', 'type' => 'select', 'options' => [0 => 'Không hoạt động']],
    ],'data' => old()] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('form'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(App\View\Components\Form::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal18ad2e0d264f9740dc73fff715357c28)): ?>
<?php $attributes = $__attributesOriginal18ad2e0d264f9740dc73fff715357c28; ?>
<?php unset($__attributesOriginal18ad2e0d264f9740dc73fff715357c28); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal18ad2e0d264f9740dc73fff715357c28)): ?>
<?php $component = $__componentOriginal18ad2e0d264f9740dc73fff715357c28; ?>
<?php unset($__componentOriginal18ad2e0d264f9740dc73fff715357c28); ?>
<?php endif; ?>
<?php /**PATH C:\laragon\www\DATN\resources\views/admin/pages/schedule/create.blade.php ENDPATH**/ ?>