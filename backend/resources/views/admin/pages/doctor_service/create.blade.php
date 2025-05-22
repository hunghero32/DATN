<x-form
    :action="route('admin.doctor_service.store')"
    method="POST"
    :backRoute="route('admin.doctor_service.index')"
    :fields="[
        ['name' => 'doctor_id',
         'label' => '* Bác sĩ',
         'type' => 'select',
         'required' => true,
         'options' => ['' => 'Lựa chọn họ và tên bác sĩ'] + $doctors->pluck('doctor_name', 'id')->toArray()],
        ['name' => 'service_id',
         'label' => '* Dịch vụ',
         'type' => 'select',
         'required' => true,
         'options' => ['' => 'Lựa chọn dịch vụ'] + $services->pluck('services_name', 'id')->toArray(),
         'attributes' => ['onchange' => 'updateServicePrice()']],
        ['name' => 'service_price',
         'label' => 'Giá dịch vụ',
         'type' => 'text',
         'required' => false,
         'attributes' => ['readonly' => true]],
        ['name' => 'fee_type',
         'label' => 'Loại phí',
         'type' => 'select',
         'required' => true,
         'options' => ['percentage' => 'Phần trăm', 'fixed' => 'Số tiền'],
         'attributes' => ['onchange' => 'toggleFeeInput()']],
        ['name' => 'percentage',
         'label' => 'Tỷ lệ phần trăm (%)',
         'type' => 'number',
         'required' => false,
         'attributes' => ['style' => 'display:none', 'min' => '0', 'max' => '100']],
        ['name' => 'fixed_amount',
         'label' => 'Số tiền cố định (VND)',
         'type' => 'number',
         'required' => false,
         'attributes' => ['style' => 'display:none', 'min' => '0']],
        ['name' => 'doctor_fee',
         'label' => 'Phí bác sĩ (VND)',
         'type' => 'text',
         'required' => true,
         'attributes' => ['readonly' => true]],
        ['name' => 'note',
         'label' => 'Ghi chú',
         'type' => 'textarea',
         'required' => true]
    ]"
    :data="old()"
/>
<script>
// Lấy giá dịch vụ từ cơ sở dữ liệu
const servicePrices = @json($servicePrices);

// Thêm trường ẩn để lưu giá trị số
document.addEventListener('DOMContentLoaded', function() {
    const form = document.querySelector('form');

    // Tạo input ẩn cho service_price_raw
    const servicePriceRaw = document.createElement('input');
    servicePriceRaw.type = 'hidden';
    servicePriceRaw.name = 'service_price_raw';
    servicePriceRaw.id = 'service_price_raw';
    form.appendChild(servicePriceRaw);

    // Tạo input ẩn cho doctor_fee_raw
    const doctorFeeRaw = document.createElement('input');
    doctorFeeRaw.type = 'hidden';
    doctorFeeRaw.name = 'doctor_fee_raw';
    doctorFeeRaw.id = 'doctor_fee_raw';
    form.appendChild(doctorFeeRaw);

    // Thêm sự kiện submit cho form để đảm bảo chỉ gửi giá trị số
    form.addEventListener('submit', function(e) {
        // Đảm bảo tất cả các trường tiền tệ chỉ chứa số nguyên
        const numericFields = ['service_price', 'doctor_fee', 'fixed_amount'];
        numericFields.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (field && field.value) {
                // Loại bỏ tất cả các ký tự không phải số
                field.value = field.value.toString().replace(/[^0-9]/g, '');
            }
        });
    });
});

// Update service price when service is selected
function updateServicePrice() {
    const serviceId = document.querySelector('#service_id').value;
    const servicePrice = servicePrices[serviceId] || 0;

    // Hiển thị giá dịch vụ đã định dạng với dấu phân cách hàng nghìn
    document.querySelector('#service_price').value = new Intl.NumberFormat('vi-VN', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(servicePrice) + ' ₫';

    // Lưu giá trị số vào trường ẩn - đảm bảo chỉ lưu số nguyên
    document.querySelector('#service_price_raw').value = parseInt(servicePrice) || 0;

    updateDoctorFee();
}

// Toggle between fixed amount and percentage input fields
function toggleFeeInput() {
    const feeType = document.querySelector('#fee_type').value;
    const fixedAmountInput = document.querySelector('#fixed_amount');
    const percentageInput = document.querySelector('#percentage');
    const doctorFeeInput = document.querySelector('#doctor_fee');

    if (feeType === 'percentage') {
        percentageInput.style.display = 'block';
        fixedAmountInput.style.display = 'none';
        fixedAmountInput.value = '';
        updateDoctorFee();
    } else if (feeType === 'fixed') {
        fixedAmountInput.style.display = 'block';
        percentageInput.style.display = 'none';
        percentageInput.value = '';
        doctorFeeInput.value = ''; // Clear doctor_fee until fixed amount is entered
        document.querySelector('#doctor_fee_raw').value = '';
    } else {
        fixedAmountInput.style.display = 'none';
        percentageInput.style.display = 'none';
        fixedAmountInput.value = '';
        percentageInput.value = '';
        doctorFeeInput.value = '';
        document.querySelector('#doctor_fee_raw').value = '';
    }
}

// Update doctor fee based on fee type
function updateDoctorFee() {
    const servicePrice = parseInt(document.querySelector('#service_price_raw').value) || 0;
    const feeType = document.querySelector('#fee_type').value;
    const percentageInput = document.querySelector('#percentage');
    const fixedAmountInput = document.querySelector('#fixed_amount');
    const doctorFeeInput = document.querySelector('#doctor_fee');
    let doctorFee = 0;

    if (feeType === 'percentage' && percentageInput.value) {
        // Đảm bảo percentage chỉ chứa số
        const percentageValue = percentageInput.value.toString().replace(/[^0-9.]/g, '');
        const percentage = parseFloat(percentageValue) || 0;
        doctorFee = Math.round((servicePrice * percentage) / 100); // Làm tròn để có số nguyên
        doctorFeeInput.value = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(doctorFee) + ' ₫';
        // Lưu giá trị số nguyên vào trường ẩn
        document.querySelector('#doctor_fee_raw').value = parseInt(doctorFee) || 0;
    } else if (feeType === 'fixed' && fixedAmountInput.value) {
        // Đảm bảo fixed_amount chỉ chứa số
        const fixedValue = fixedAmountInput.value.toString().replace(/[^0-9]/g, '');
        doctorFee = parseInt(fixedValue) || 0;
        doctorFeeInput.value = new Intl.NumberFormat('vi-VN', {
            style: 'decimal',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(doctorFee) + ' ₫';
        // Lưu giá trị số nguyên vào trường ẩn
        document.querySelector('#doctor_fee_raw').value = parseInt(doctorFee) || 0;
    } else {
        doctorFeeInput.value = '';
        document.querySelector('#doctor_fee_raw').value = '';
    }
}

// Custom select functionality
document.querySelectorAll('.custom-select').forEach(select => {
    const trigger = select.querySelector('.custom-select__trigger');
    const options = select.querySelector('.custom-options');
    const hiddenInput = select.parentElement.querySelector('input[type="hidden"]');

    trigger.addEventListener('click', () => {
        const isOpen = options.style.display === 'block';
        document.querySelectorAll('.custom-options').forEach(opt => opt.style.display = 'none');
        options.style.display = isOpen ? 'none' : 'block';
    });

    select.querySelectorAll('.custom-option').forEach(option => {
        option.addEventListener('click', () => {
            const value = option.getAttribute('data-value');
            select.querySelector('.custom-select__display').textContent = option.textContent;
            hiddenInput.value = value;
            options.style.display = 'none';
            select.querySelectorAll('.custom-option').forEach(opt => opt.classList.remove('selected'));
            option.classList.add('selected');

            if (hiddenInput.id === 'service_id') {
                updateServicePrice();
            } else if (hiddenInput.id === 'fee_type') {
                toggleFeeInput();
            }
        });
    });
});

// Filter options for search
function filterOptions(input) {
    const filter = input.value.toLowerCase();
    const options = input.parentElement.querySelectorAll('.custom-option');
    options.forEach(option => {
        const text = option.textContent.toLowerCase();
        option.style.display = text.includes(filter) ? 'block' : 'none';
    });
}

// Initialize event listeners
document.querySelector('#fee_type').addEventListener('change', toggleFeeInput);
document.querySelector('#service_id').addEventListener('change', updateServicePrice);
document.querySelector('#percentage').addEventListener('input', updateDoctorFee);
document.querySelector('#fixed_amount').addEventListener('input', updateDoctorFee);

// Form validation before submission
document.querySelector('form').addEventListener('submit', (e) => {
    const doctorId = document.querySelector('#doctor_id').value;
    const serviceId = document.querySelector('#service_id').value;
    const feeType = document.querySelector('#fee_type').value;
    const percentage = document.querySelector('#percentage').value;
    const fixedAmount = document.querySelector('#fixed_amount').value;
    const doctorFeeRaw = document.querySelector('#doctor_fee_raw').value;

    if (!doctorId || !serviceId || !feeType) {
        e.preventDefault();
        alert('Vui lòng chọn bác sĩ, dịch vụ và loại phí!');
        return;
    }

    if (feeType === 'percentage' && !percentage) {
        e.preventDefault();
        alert('Vui lòng nhập tỷ lệ phần trăm!');
        return;
    }

    if (feeType === 'fixed' && !fixedAmount) {
        e.preventDefault();
        alert('Vui lòng nhập số tiền cố định!');
        return;
    }

    if (!doctorFeeRaw) {
        e.preventDefault();
        alert('Phí bác sĩ không được để trống!');
        return;
    }

    // Thay thế giá trị hiển thị bằng giá trị số nguyên trước khi gửi form
    const servicePriceInput = document.querySelector('#service_price');
    const doctorFeeInput = document.querySelector('#doctor_fee');
    const servicePriceRaw = document.querySelector('#service_price_raw');
    const doctorFeeRawInput = document.querySelector('#doctor_fee_raw');

    // Đảm bảo chỉ gửi giá trị số nguyên không có ký tự đặc biệt
    // Sử dụng trường ẩn để gửi giá trị số nguyên
    servicePriceInput.value = parseInt(servicePriceRaw.value) || 0;
    doctorFeeInput.value = parseInt(doctorFeeRawInput.value) || 0;

    // Xóa bỏ tất cả các ký tự không phải số từ giá trị
    servicePriceInput.value = servicePriceInput.value.toString().replace(/[^0-9]/g, '');
    doctorFeeInput.value = doctorFeeInput.value.toString().replace(/[^0-9]/g, '');

    // Đảm bảo các trường khác cũng chỉ chứa số
    if (feeType === 'percentage' && percentage) {
        document.querySelector('#percentage').value = parseFloat(percentage) || 0;
    }

    if (feeType === 'fixed' && fixedAmount) {
        document.querySelector('#fixed_amount').value = parseInt(fixedAmount.toString().replace(/[^0-9]/g, '')) || 0;
    }
});
</script>
<style>
    .price-display {
        display: block;
        margin-top: 5px;
        font-weight: bold;
    }
</style>


