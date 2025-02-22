<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Schedule;
use Illuminate\Http\Request;

class SchedulesController extends Controller
{
    public function index()

    {
        $data=Schedule::all();
        dd($data);
        return view('admin.pages.schedule.index');
    }
}
