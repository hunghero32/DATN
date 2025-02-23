<?php if (isset($component)) { $__componentOriginal42e38bf3ebb8c69d910174788b0810d7 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal42e38bf3ebb8c69d910174788b0810d7 = $attributes; } ?>
<?php $component = App\View\Components\FlashMessage::resolve([] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('flash-message'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(App\View\Components\FlashMessage::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal42e38bf3ebb8c69d910174788b0810d7)): ?>
<?php $attributes = $__attributesOriginal42e38bf3ebb8c69d910174788b0810d7; ?>
<?php unset($__attributesOriginal42e38bf3ebb8c69d910174788b0810d7); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal42e38bf3ebb8c69d910174788b0810d7)): ?>
<?php $component = $__componentOriginal42e38bf3ebb8c69d910174788b0810d7; ?>
<?php unset($__componentOriginal42e38bf3ebb8c69d910174788b0810d7); ?>
<?php endif; ?>
<?php $attributes ??= new \Illuminate\View\ComponentAttributeBag; ?>
<?php foreach($attributes->onlyProps(['columns', 'data', 'actions' => [], 'route' => '']) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $attributes = $attributes->exceptProps(['columns', 'data', 'actions' => [], 'route' => '']); ?>
<?php foreach (array_filter((['columns', 'data', 'actions' => [], 'route' => '']), 'is_string', ARRAY_FILTER_USE_KEY) as $__key => $__value) {
    $$__key = $$__key ?? $__value;
} ?>
<?php $__defined_vars = get_defined_vars(); ?>
<?php foreach ($attributes as $__key => $__value) {
    if (array_key_exists($__key, $__defined_vars)) unset($$__key);
} ?>
<?php unset($__defined_vars); ?>


<div class="content-wrapper mt-3">

    <div class="container-xxl flex-grow-1 container-p-y mb-5">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Danh sách /</span> <?php echo e($title); ?></h4>
        <form method="GET" action=<?php echo e($route); ?>>
            <div class="d-flex align-items-center gap-2 w-100">
                
                <div class="flex-grow-1">
                    <?php if (isset($component)) { $__componentOriginal9bcb93d959b7a1beb2f757ce2082c9b7 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal9bcb93d959b7a1beb2f757ce2082c9b7 = $attributes; } ?>
<?php $component = App\View\Components\InputSearch::resolve(['id' => 'search-doctor','name' => 'search','placeholder' => 'Nhập tên bác sĩ...'] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('input-search'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(App\View\Components\InputSearch::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes([]); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal9bcb93d959b7a1beb2f757ce2082c9b7)): ?>
<?php $attributes = $__attributesOriginal9bcb93d959b7a1beb2f757ce2082c9b7; ?>
<?php unset($__attributesOriginal9bcb93d959b7a1beb2f757ce2082c9b7); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal9bcb93d959b7a1beb2f757ce2082c9b7)): ?>
<?php $component = $__componentOriginal9bcb93d959b7a1beb2f757ce2082c9b7; ?>
<?php unset($__componentOriginal9bcb93d959b7a1beb2f757ce2082c9b7); ?>
<?php endif; ?>
                </div>

                
                <?php $__currentLoopData = $selects; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $select): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <div class="flex-grow-1">
                        <?php if (isset($component)) { $__componentOriginal8e2dc8f2be332c893f4b66177936e8a3 = $component; } ?>
<?php if (isset($attributes)) { $__attributesOriginal8e2dc8f2be332c893f4b66177936e8a3 = $attributes; } ?>
<?php $component = App\View\Components\SelectSearch::resolve(['name' => ''.e($select['name']).'','options' => $select['options']] + (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag ? (array) $attributes->getIterator() : [])); ?>
<?php $component->withName('select-search'); ?>
<?php if ($component->shouldRender()): ?>
<?php $__env->startComponent($component->resolveView(), $component->data()); ?>
<?php if (isset($attributes) && $attributes instanceof Illuminate\View\ComponentAttributeBag && $constructor = (new ReflectionClass(App\View\Components\SelectSearch::class))->getConstructor()): ?>
<?php $attributes = $attributes->except(collect($constructor->getParameters())->map->getName()->all()); ?>
<?php endif; ?>
<?php $component->withAttributes(['id' => ''.e($select['id']).'']); ?>
<?php echo $__env->renderComponent(); ?>
<?php endif; ?>
<?php if (isset($__attributesOriginal8e2dc8f2be332c893f4b66177936e8a3)): ?>
<?php $attributes = $__attributesOriginal8e2dc8f2be332c893f4b66177936e8a3; ?>
<?php unset($__attributesOriginal8e2dc8f2be332c893f4b66177936e8a3); ?>
<?php endif; ?>
<?php if (isset($__componentOriginal8e2dc8f2be332c893f4b66177936e8a3)): ?>
<?php $component = $__componentOriginal8e2dc8f2be332c893f4b66177936e8a3; ?>
<?php unset($__componentOriginal8e2dc8f2be332c893f4b66177936e8a3); ?>
<?php endif; ?>
                    </div>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

                
                <div>
                    <button type="submit" class="btn btn-primary">Tìm kiếm</button>
                </div>
            </div>
        </form>
        
        <?php if(collect($actions)->where('type', 'global')->isNotEmpty()): ?>
            <div class="text-end mt-5">
                <?php $__currentLoopData = $actions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $action): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <?php if($action['type'] == 'global'): ?>
                        <a href="<?php echo e($action['route']()); ?>" class="btn <?php echo e($action['class']); ?>">
                            <?php echo e($action['label']); ?>

                        </a>
                    <?php endif; ?>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </div>
        <?php endif; ?>

        <table class="table">
            <thead>
                <tr>
                    <?php $__currentLoopData = $columns; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $column): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                        <th><?php echo e($column['label']); ?></th>
                    <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                    <?php if(collect($actions)->where('type', 'row')->isNotEmpty()): ?>
                        <th>Actions</th>
                    <?php endif; ?>
                </tr>
            </thead>
            <tbody>
                <?php $__currentLoopData = $data; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                    <tr>
                        <?php $__currentLoopData = $columns; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $column): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                            <td>
                                
                                <?php if($column['key'] == 'status'): ?>
                                    <?php
                                        $status = $row[$column['name']] ?? 'default'; // Nếu không có, lấy 'default'
                                        $statusConfig = config(
                                            "common.statuses.$status",
                                            config('common.statuses.default'),
                                        );

                                        $statusText = $statusConfig['text'] ?? 'Unknown';
                                        $badgeClass = $statusConfig['class'] ?? 'badge badge-dark';
                                    ?>

                                    <span class="<?php echo e($badgeClass); ?>"><?php echo e($statusText); ?></span>
                                


                                
                            <?php elseif(
                                !empty($row[$column['key']]) &&
                                    is_string($row[$column['key']]) &&
                                    preg_match('/\.(jpg|jpeg|png|gif|svg)$/i', $row[$column['key']])): ?>
                                <img src="<?php echo e(Storage::url($row[$column['key']])); ?>" alt="Image"
                                    class="img-thumbnail" width="100">

                                
                            <?php else: ?>
                                <?php echo e($row[$column['key']] ?? ''); ?>

                        <?php endif; ?>
                        </td>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>

                
                <?php if(collect($actions)->where('type', 'row')->isNotEmpty()): ?>
                    <td>
                        <div class="dropdown">
                            <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                <i class="bx bx-dots-vertical-rounded"></i>
                            </button>
                            <div class="dropdown-menu">
                                <?php $__currentLoopData = $actions; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $action): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <?php if($action['type'] == 'row'): ?>
                                        <?php if($action['method'] == 'DELETE'): ?>
                                            
                                            <button type="button" class="dropdown-item" data-bs-toggle="modal"
                                                data-bs-target="#confirmDelete<?php echo e($row['id']); ?>">
                                                <?php echo e($action['label']); ?>

                                            </button>
                                        <?php else: ?>
                                            
                                            <a href="<?php echo e($action['route']($row['id'])); ?>" class="dropdown-item">
                                                <?php echo e($action['label']); ?>

                                            </a>
                                        <?php endif; ?>
                                    <?php endif; ?>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </div>
                        </div>
                    </td>
                <?php endif; ?>
                </tr>
                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
            </tbody>
        </table>

        
        <?php $__currentLoopData = $data; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $row): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <div class="modal fade" id="confirmDelete<?php echo e($row['id']); ?>" tabindex="-1"
                aria-labelledby="modalLabel<?php echo e($row['id']); ?>" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="modalLabel<?php echo e($row['id']); ?>">Xác nhận xoá</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal"
                                aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            Bạn có chắc muốn xóa mục này không?
                        </div>
                        <div class="modal-footer">
                            <form
                                action="<?php echo e(isset($action['route']) && is_callable($action['route']) ? $action['route']($row['id']) : '#'); ?>"
                                method="POST">
                                <?php echo csrf_field(); ?>
                                <?php echo method_field('DELETE'); ?>
                                <button type="submit" class="btn btn-danger">Xóa</button>
                            </form>
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Hủy</button>
                        </div>
                    </div>
                </div>
            </div>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </div>
</div>


<script>
    document.querySelectorAll('.dropdown-menu').forEach(menu => {
        menu.addEventListener('click', function(event) {
            event.stopPropagation();
        });
    });
</script>
<?php /**PATH C:\laragon\www\DATN\resources\views/components/table-list-component.blade.php ENDPATH**/ ?>