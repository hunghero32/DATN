<?php $__env->startSection('title', 'Tạo mới'); ?>
<?php $__env->startSection('content'); ?>
<div class="content-wrapper">
    <!-- Content -->
    <div class="container-xxl flex-grow-1 container-p-y">
        <h4 class="fw-bold py-3 mb-4"><span class="text-muted fw-light">Form /</span> Thêm thông tin bác sĩ</h4>

        <div class="row">
            <div class="col-md-12">
                <div class="card mb-4">
                    <h5 class="card-header">Profile Details</h5>

                    <!-- Account -->
                    <hr class="my-0" />
                    <div class="card-body">
                        <form action="<?php echo e($action); ?>" method="POST" enctype="multipart/form-data">
                            <?php echo csrf_field(); ?>
                            <?php echo method_field($method); ?>

                            <div class="row mt-3">
                                <?php $__currentLoopData = $fields; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $field): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                    <?php if($field['type'] == 'image'): ?>
                                        <div class="mb-3 col-md-12">
                                            <label for="<?php echo e($field['name']); ?>" class="form-label"><?php echo e($field['label']); ?></label>
                                            <div class="d-flex align-items-start align-items-sm-center gap-4">
                                                <img src="<?php echo e(isset($data[$field['name']]) ? Storage::url($data[$field['name']]) : asset('admin/assets/img/avatars/1.png')); ?>"
                                                    alt="user-avatar" class="d-block rounded" height="100" width="100" id="uploadedAvatar" />
                                                <div class="button-wrapper">
                                                    <label for="<?php echo e($field['name']); ?>" class="btn btn-primary me-2 mb-4">
                                                        <i class="bx bx-upload d-block d-sm-none"></i>
                                                        <input type="file" id="<?php echo e($field['name']); ?>" name="<?php echo e($field['name']); ?>" class="account-file-input"/>
                                                    </label>
                                                    <button type="button" class="btn btn-outline-secondary account-image-reset mb-4">
                                                        <i class="bx bx-reset d-block d-sm-none"></i>
                                                        <span class="d-none d-sm-block">Reset</span>
                                                    </button>
                                                </div>
                                            </div>
                                            <input type="hidden" name="<?php echo e($field['name']); ?>_current" value="<?php echo e($data[$field['name']] ?? ''); ?>">
                                            <?php $__errorArgs = [$field['name']];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                                <div class="text-danger"><?php echo e($message); ?></div>
                                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                                        </div>
                                    <?php else: ?>
                                        <div class="mb-3 col-md-6">
                                            <label for="<?php echo e($field['name']); ?>" class="form-label"><?php echo e($field['label']); ?></label>
                                            <?php if($field['type'] == 'select'): ?>
                                            <select id="<?php echo e($field['name']); ?>" name="<?php echo e($field['name']); ?>" class="select2 form-select">
                                                <?php $__currentLoopData = $field['options']; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $id => $name): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                                                    <option value="<?php echo e($id); ?>"
                                                        <?php echo e((old($field['name'], $data[$field['name']] ?? '') == $id) ? 'selected' : ''); ?>>
                                                        <?php echo e($name); ?>

                                                    </option>
                                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                                            </select>


                                            <?php else: ?>
                                                <input type="<?php echo e($field['type']); ?>" class="form-control" id="<?php echo e($field['name']); ?>" name="<?php echo e($field['name']); ?>"
                                                       value="<?php echo e(old($field['name'], $data[$field['name']] ?? '')); ?>" placeholder="<?php echo e($field['placeholder'] ?? ''); ?>">
                                            <?php endif; ?>
                                            <?php $__errorArgs = [$field['name']];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?>
                                                <div class="text-danger"><?php echo e($message); ?></div>
                                            <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
                                        </div>
                                    <?php endif; ?>
                                <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
                            </div>

                            <div class="mt-2">
                                <button type="submit" class="btn btn-primary me-2">Lưu thay đổi</button>
                                <button type="reset" class="btn btn-outline-secondary">Quay lại</button>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>
    </div>
</div>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('admin.index', \Illuminate\Support\Arr::except(get_defined_vars(), ['__data', '__path']))->render(); ?><?php /**PATH C:\laragon\www\DATN\resources\views/components/form.blade.php ENDPATH**/ ?>