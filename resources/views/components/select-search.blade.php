<div class="input-group {{$class}}">
    <select name="{{$name}}" class="form-select">
        @foreach ($options as $value => $label)
            <option value="{{$value}}" {{$selected == $value ? 'selected' : ''}}>
                {{$label}}
            </option>
        @endforeach
    </select>
</div>
