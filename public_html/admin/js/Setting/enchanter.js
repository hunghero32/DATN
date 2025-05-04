class Enchanter {
    constructor(containerSelector, options = {}, callbacks = {}) {
        this.options = {
            finishSelector: '[data-enchanter="finish"]',
            navItemSelector: '[data-toggle="tab"]',
            nextSelector: '[data-enchanter="next"]',
            previousSelector: '[data-enchanter="previous"]'
        };
        this.callbacks = {
            onNext: null,
            onPrevious: null,
        };
        Object.assign(this.options, options);
        Object.assign(this.callbacks, callbacks);
        this.container = document.getElementById(containerSelector);
        this.bootstrap();
    }
    next() {
        if (this.callbacks.onNext() != null && this.callbacks.onNext() == false) {
            return false;
        }

        var forms = document.getElementsByClassName('needs-validation');
        var allValid = ""
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {

            var inputs = form.querySelectorAll('input, textarea');
            allValid = Array.from(inputs)
                .filter(function (input) {
                    return input.parentNode.parentNode.parentNode.parentNode.parentNode.classList.contains('active');
                })
                .every(function (input) {
                    return input.checkValidity() && input.value !== "";
                });
            if (allValid) {
                // form.classList.remove('was-validated');
                setTimeout(() => {
                    forms[0].classList.remove('was-validated')
                }, 100);
            } else {
                form.classList.add('was-validated');
            }
        });
        if (allValid) {
            let nextElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabNextIndex + ')');
            new bootstrap.Tab(nextElement).show();
            this.tabCurrentIndex = this.tabNextIndex;
            this.tabPreviousIndex = this.previousIndex();
            this.tabNextIndex = this.nextIndex();
            if (this.tabCurrentIndex > 1) {
                this.container.querySelector(this.options.previousSelector).classList.remove('d-none');
            }
            if (this.tabNextIndex == null) {
                this.container.querySelector(this.options.nextSelector).classList.add('d-none');
                this.container.querySelector(this.options.finishSelector).classList.remove('d-none');
            }
            const totalIndex = this.tabCurrentIndex
            for (let i = 1; i < totalIndex; i++) {
                this.tabPreviousIndex = i
                let prevElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabPreviousIndex + ')');
                console.log(prevElement)
                prevElement.classList.add('actives')
            }
        }
    }
    previous() {
        if (typeof this.callbacks.onPrevious === 'function' && this.callbacks.onPrevious() === false) {
            return false;
        }

        const forms = document.querySelectorAll('.needs-validation')
        // Loop over them and prevent submission
        Array.from(forms).forEach(form => {
            form.classList.add('was-validated')
        })



        let nextElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabPreviousIndex + ')');
        new bootstrap.Tab(nextElement).show();
        this.tabCurrentIndex = this.tabPreviousIndex;
        this.tabPreviousIndex = this.previousIndex();
        this.tabNextIndex = this.nextIndex();
        console.log(this.container.querySelector('.nav .nav-link:nth-child(' + this.tabNextIndex + ')'))
        if (this.tabPreviousIndex == null) {
            this.container.querySelector(this.options.previousSelector).classList.add('d-none');
        }
        if (this.tabNextIndex != null) {
            this.container.querySelector(this.options.nextSelector).classList.remove('d-none');
            this.container.querySelector(this.options.finishSelector).classList.add('d-none');
        }
        let prevElement = this.container.querySelector('.nav .nav-link:nth-child(' + this.tabNextIndex + ')');
        console.log(prevElement)
        prevElement.classList.remove('actives')
    }
    bootstrap() {
        this.tabCurrentIndex = this.currentIndex();
        this.tabNextIndex = this.nextIndex();
        this.container.querySelector(this.options.previousSelector).classList.add('d-none');
        this.container.querySelector(this.options.finishSelector).classList.add('d-none');
        this.addEventBindings();
    }
    addEventBindings() {
        this.container.querySelector(this.options.previousSelector).addEventListener('click', () => this.previous());
        this.container.querySelector(this.options.nextSelector).addEventListener('click', () => this.next());
    }
    getIndex(element) {
        return [...element.parentNode.children].findIndex(c => c == element) + 1;
    }
    currentIndex() {
        return this.getIndex(this.container.querySelector('.nav .nav-link.active'));
    }
    nextIndex() {
        let nextIndexCandidate = this.tabCurrentIndex + 1;
        if (this.container.querySelector('.nav .nav-link:nth-child(' + nextIndexCandidate + ')') == null) {
            return null;
        }
        return nextIndexCandidate;
    }
    previousIndex() {
        let nextIndexCandidate = this.tabCurrentIndex - 1;
        if (this.container.querySelector('.nav .nav-link:nth-child(' + nextIndexCandidate + ')') == null) {
            return null;
        }
        return nextIndexCandidate;
    }
}