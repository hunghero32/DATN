<?php
namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class InputSearch extends Component
{
    public string $name;
    public string $id;
    public string $value;
    public string $placeholder;
    public string $class;
    public string $dataId;

    public function __construct(
        string $name = '',
        string $id = '',
        string $value = '',
        string $placeholder = 'Tìm kiếm...',
        string $class = '',
        string $dataId = ''
    ) {
        $this->name = $name;
        $this->id = $id;
        $this->value = $value;
        $this->placeholder = $placeholder;
        $this->class = $class;
        $this->dataId = $dataId;
    }

    public function render(): View|Closure|string
    {
        return view('components.input-search');
    }
}
