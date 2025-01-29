<?php

namespace App\View\Components;

use Illuminate\View\Component;

class TableListComponent extends Component
{
    public $columns;
    public $data;
    public $actions;

    public function __construct($columns = [], $data = [], $actions = [])
    {
        $this->columns = $columns;
        $this->data = $data;
        $this->actions = $actions;

    }

    public function render()
    {
        return view('components.table-list-component', [
            'columns' => $this->columns,
            'data' => $this->data,
            'actions' => $this->actions,
        ]);
    }
}
