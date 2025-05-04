<div class="input-group {{$class ?? ''}}">
    <div class="custom-select-wrapper" id="{{ $name }}-wrapper">
        <div class="custom-select">
            <div class="custom-select__trigger" tabindex="0">
                <span class="custom-select__display">
                    {{ $selected ? ($options[$selected] ?? $options['all']) : $options['all'] }}
                </span>
                <div class="arrow"></div>
            </div>
            <div class="custom-options">
                <input type="text" class="custom-select__search" placeholder="Tìm kiếm..." oninput="filterOptions(this)">
                @foreach ($options as $value => $label)
                    <span class="custom-option {{ $selected == $value ? 'selected' : '' }}"
                          data-value="{{ $value }}"
                          data-label="{{ $label }}">
                        {{ $label }}
                    </span>
                @endforeach
            </div>
        </div>
        <input type="hidden" name="{{ $name }}" value="{{ $selected }}">
    </div>
</div>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        const wrapper = document.getElementById('{{ $name }}-wrapper');
        if (!wrapper) return;

        const select = wrapper.querySelector('.custom-select');
        const trigger = wrapper.querySelector('.custom-select__trigger');
        const options = wrapper.querySelectorAll('.custom-option');
        const display = wrapper.querySelector('.custom-select__display');
        const hiddenInput = wrapper.querySelector('input[type="hidden"]');
        const searchInput = wrapper.querySelector('.custom-select__search');

        // Toggle dropdown
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            select.classList.toggle('open');
            if (select.classList.contains('open')) {
                searchInput.focus();
            }
        });

        // Handle option selection
        options.forEach(option => {
            option.addEventListener('click', (e) => {
                e.stopPropagation();
                display.textContent = option.getAttribute('data-label');
                hiddenInput.value = option.getAttribute('data-value');
                options.forEach(opt => opt.classList.remove('selected'));
                option.classList.add('selected');
                select.classList.remove('open');
            });
        });

        // Close dropdown when clicking outside
        document.addEventListener('click', (e) => {
            if (!wrapper.contains(e.target)) {
                select.classList.remove('open');
            }
        });

        // Prevent dropdown close when clicking search input
        searchInput.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
</script>

<style>
    .custom-select-wrapper {
        position: relative;
        width: 100%;
    }

    .custom-select {
        position: relative;
        display: block;
        width: 100%;
    }

    .custom-select__trigger {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 8px 12px;
        background: #fff;
        border: 1px solid #d9dee3;
        border-radius: 4px;
        cursor: pointer;
        height: 38px;
    }

    .custom-select__display {
        color: #333;
    }

    .arrow {
        border: solid #696cff;
        border-width: 0 2px 2px 0;
        display: inline-block;
        padding: 3px;
        transform: rotate(45deg);
        transition: transform 0.3s ease;
    }

    .custom-select.open .arrow {
        transform: rotate(-135deg);
    }

    .custom-options {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: #fff;
        border: 1px solid #d9dee3;
        border-radius: 4px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        max-height: 200px;
        overflow-y: auto;
        display: none;
        z-index: 1000;
    }

    .custom-select.open .custom-options {
        display: block;
    }

    .custom-select__search {
        width: 100%;
        padding: 8px;
        border: none;
        border-bottom: 1px solid #d9dee3;
        outline: none;
        box-sizing: border-box;
    }

    .custom-option {
        display: block;
        padding: 8px 12px;
        cursor: pointer;
        transition: background 0.3s ease;
    }

    .custom-option:hover {
        background: #f0f7ff;
    }

    .custom-option.selected {
        background: #696cff;
        color: #fff;
    }
</style>

<script>
    // Hàm bỏ dấu tiếng Việt
    function removeDiacritics(str) {
        return str.normalize('NFD')
                 .replace(/[\u0300-\u036f]/g, '')
                 .replace(/đ/g, 'd')
                 .replace(/Đ/g, 'D');
    }

    // Hàm lọc tùy chọn trong dropdown
    function filterOptions(input) {
        const filter = removeDiacritics(input.value.toLowerCase());
        const customSelect = input.closest('.custom-select');
        const options = customSelect.querySelectorAll('.custom-option');

        options.forEach(option => {
            const text = removeDiacritics(option.textContent.toLowerCase());
            if (text.includes(filter)) {
                option.style.display = 'block';
            } else {
                option.style.display = 'none';
            }
        });
    }

    document.addEventListener('DOMContentLoaded', function() {
        const customSelects = document.querySelectorAll('.custom-select');

        customSelects.forEach(select => {
            const trigger = select.querySelector('.custom-select__trigger');
            const options = select.querySelectorAll('.custom-option');
            const display = select.querySelector('.custom-select__display');
            const hiddenInput = select.closest('.custom-select-wrapper').querySelector('input[type="hidden"]');

            // Mở/đóng dropdown khi click vào trigger
            trigger.addEventListener('click', () => {
                select.classList.toggle('open');
            });

            // Xử lý khi chọn một tùy chọn
            options.forEach(option => {
                option.addEventListener('click', () => {
                    const value = option.getAttribute('data-value');
                    const text = option.textContent;

                    // Cập nhật giá trị hiển thị
                    display.textContent = text;
                    hiddenInput.value = value;

                    // Đánh dấu tùy chọn được chọn
                    options.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');

                    // Đóng dropdown
                    select.classList.remove('open');
                });
            });

            // Đóng dropdown khi click bên ngoài
            document.addEventListener('click', (e) => {
                if (!select.contains(e.target)) {
                    select.classList.remove('open');
                }
            });
        });
    });
</script>
