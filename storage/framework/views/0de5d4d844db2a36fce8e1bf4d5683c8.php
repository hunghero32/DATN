<?php if (isset($component)) { $__componentOriginal18ad2e0d264f9740dc73fff715357c28 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal18ad2e0d264f9740dc73fff715357c28 = $attributes; } ?>
<?php $component = App\View\Components\Form::resolve(['action' => route('admin.doctors.update', $data->id),'method' => 'PUT','fields' => [
        ['name' => 'doctor_avatar', 'label' => 'Ảnh', 'type' => 'image'],
        ['name' => 'doctor_name', 'label' => 'Họ và tên', 'type' => 'text'],
        ['name' => 'doctor_bio', 'label' => 'Thông tin', 'type' => 'textarea'],
        ['name' => 'specialty_id', 'label' => 'Chuyên khoa', 'type' => 'select', 'options' => $specialties],
        ['name' => 'exp', 'label' => 'Kinh nghiệm (năm)', 'type' => 'text'],
        ['name' => 'file', 'label' => 'Tải lên (CV, Chứng chỉ)', 'type' => 'file'],
    ],'data' => $data] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
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
<?php /**PATH C:\laragon\www\DATN\resources\views/admin/pages/doctor/edit.blade.php ENDPATH**/ ?>