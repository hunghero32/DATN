<div class="input-group <?php echo e($class); ?>">
    <select name="<?php echo e($name); ?>" class="form-select">
        <?php $__currentLoopData = $options; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $value => $label): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
            <option value="<?php echo e($value); ?>" <?php echo e($selected == $value ? 'selected' : ''); ?>>
                <?php echo e($label); ?>

            </option>
        <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
    </select>
</div>
<?php /**PATH C:\laragon\www\DATN\resources\views/components/select-search.blade.php ENDPATH**/ ?>