<div id="toast-container"
    class="fixed top-5 right-5 p-4 rounded-lg text-white shadow-lg transition-opacity duration-500"
    style="display: none; background-color: <?php echo e($type === 'success' ? 'green' : ($type === 'error' ? 'red' : 'gray')); ?>;">
    <?php echo e($message); ?>

</div>

<script>
    document.addEventListener("DOMContentLoaded", function () {
        let toast = document.getElementById("toast-container");
        if (toast.innerText.trim() !== '') {
            toast.style.display = 'block';
            setTimeout(() => {
                toast.style.opacity = 0;
                setTimeout(() => toast.style.display = 'none', 500);
            }, 3000);
        }
    });
</script>
<?php /**PATH C:\laragon\www\DATN\resources\views/components/toast-mes.blade.php ENDPATH**/ ?>