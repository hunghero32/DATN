<?php $__env->startSection('title', 'Thông tin đặt lịch bác sĩ'); ?>
<?php $__env->startSection('content'); ?>
<?php if (isset($component)) { $__componentOriginal4b58b2a4678ee6ee585983f9d32501c2 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal4b58b2a4678ee6ee585983f9d32501c2 = $attributes; } ?>
<?php $component = App\View\Components\TableListComponent::resolve(['title' => 'Danh sách đặt lịch','route' => route('admin.doctors.search'),'columns' => [
        ['key' => 'id', 'label' => 'ID'],
        ['key' => 'doctor_name', 'label' => 'Họ và Tên'],
        ['key' => 'time_start', 'label' => 'Giờ bắt đầu'],
        ['key' => 'time_end', 'label' => 'Giờ kết thúc'],
        ['key' => 'working_date', 'name'=>'approve', 'label' => 'Ngày làm việc'],
        ['key' => 'max_patients', 'label' => 'Số lượng bệnh nhân tối đa'],
        ['key' => 'status', 'name'=>'status', 'label' => 'Trạng thái'],
    ],'data' => $data,'actions' => [
        [
            'label' => 'Thêm mới',
            'route' => fn() => route('admin.schedule.create'),
            'method' => 'GET',
            'type' => 'global',
            'class' => 'btn btn-success btn-sm'
        ],
        [
            'label' => 'Chỉnh sửa',
            'route' => fn($id) => route('admin.schedule.edit', $id),
            'method' => 'GET',
            'modal' => true,
            'type' => 'row',
            'class' => 'btn btn-primary btn-sm'
        ],
        [
            'label' => 'Xóa',
            'route' => fn($id) => route('admin.schedule.delete', $id),
            'method' => 'DELETE',
            'type' => 'row',
            'modal' => true,
            'confirm' => 'Bạn có chắc muốn xóa?',
        ],
    ]] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('table-list-component'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(App\View\Components\TableListComponent::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal4b58b2a4678ee6ee585983f9d32501c2)): ?>
<?php $attributes = $__attributesOriginal4b58b2a4678ee6ee585983f9d32501c2; ?>
<?php unset($__attributesOriginal4b58b2a4678ee6ee585983f9d32501c2); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal4b58b2a4678ee6ee585983f9d32501c2)): ?>
<?php $component = $__componentOriginal4b58b2a4678ee6ee585983f9d32501c2; ?>
<?php unset($__componentOriginal4b58b2a4678ee6ee585983f9d32501c2); ?>
<?php endif; ?>

<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.index', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\DATN\resources\views/admin/pages/schedule/index.blade.php ENDPATH**/ ?>