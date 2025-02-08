<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Form extends Component
{
    public $action;
    public $method;
    public $fields;
    public $data;
    public function __construct($action, $method = 'POST', $fields = [], $data = null)
    {
        $this->action = $action;
        $this->method = strtoupper($method);
        $this->fields = $fields;
        $this->data = $data;
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.form',[
            'action'=>$this->action,
            'mehtod'=>$this->method,
            'fields'=>$this->fields,
            'data'=>$this->data,
        ]);
    }
}
