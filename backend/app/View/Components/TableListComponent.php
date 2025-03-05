<?php

namespace App\View\Components;

use Illuminate\View\Component;

class TableListComponent extends Component
{
    public $columns;
    public $data;
    public $actions;
    public  $selects;
    public $route;
    public $title;

    public function __construct($columns = [], $data = [], $actions = [], $selects=[],$route=null,$title=null)
    {
        $this->columns = $columns;
        $this->data = $data;
        $this->actions = $actions;
        $this->selects = $selects;
        $this->route=$route;
        $this->title=$title;

    }

    public function render()

    {
        return view('components.table-list-component', [
            'columns' => $this->columns,
            'data' => $this->data,
            'actions' => $this->actions,
            'selects' => $this->selects,
            'route'=>$this->route,
            'title'=>$this->title,
        ]);
    }
}
