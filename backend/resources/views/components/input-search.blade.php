@props(['id', 'name', 'value' => '', 'placeholder'])

<input
    type="text"
    class="form-control"
    id="{{ $id }}"
    name="{{ $name }}"
    value="{{ $value }}"
    placeholder="{{ $placeholder }}"
>
