<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index(){
        $data=Doctor::all();
        return view('admin.pages.doctor.index',compact('data'));
    }
    public function create(){
        return view('admin.pages.doctor.create');
    }
}
