<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class SelectSearch extends Component
{
    public string $name;
    public array $options;
    public string $selected;
    public string $class;

    public function __construct(
        string $name = '',
        array $options = [],
        string $selected = '',
        string $class = ''
    ) {
        $this->name = $name;
        $this->options = $options;
        $this->selected = $selected;
        $this->class = $class;
    }

    public function render(): View|Closure|string
    {
        return view('components.select-search');
    }
}
