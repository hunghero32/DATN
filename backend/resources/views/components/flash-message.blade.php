{{-- resources/views/components/flash-message.blade.php --}}

@if (session('success'))
    <div class="alert alert-success alert-dismissible fade show position-relative overflow-hidden" role="alert">
        {{ session('success') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <div class="progress-bar bg-success"></div>
    </div>
@endif

@if (session('error'))
    <div class="alert alert-danger alert-dismissible fade show position-relative overflow-hidden" role="alert">
        {{ session('error') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <div class="progress-bar bg-danger"></div>
    </div>
@endif

@if (session('warning'))
    <div class="alert alert-warning alert-dismissible fade show position-relative overflow-hidden" role="alert">
        {{ session('warning') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <div class="progress-bar bg-warning"></div>
    </div>
@endif

@if (session('info'))
    <div class="alert alert-info alert-dismissible fade show position-relative overflow-hidden" role="alert">
        {{ session('info') }}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        <div class="progress-bar bg-info"></div>
    </div>
@endif

<style>
.alert {
    margin-bottom: 1rem;
}
.progress-bar {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 4px;
    width: 100%;
    animation: progress-bar 4s linear forwards;
}
@keyframes progress-bar {
    0% {
        width: 100%;
    }
    100% {
        width: 0%;
    }
}
.alert.show {
    animation: fadeOut 4s linear forwards;
}
@keyframes fadeOut {
    0% {
        opacity: 1;
    }
    90% {
        opacity: 1;
    }
    100% {
        opacity: 0;
    }
}
</style>

<script>
document.addEventListener('DOMContentLoaded', function() {
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.remove();
        }, 3000);
    });
});
</script>
