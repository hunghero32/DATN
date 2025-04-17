<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Specialty;

class SpecialtyController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $specialties = Specialty::orderBy('id','DESC')->get();
        return response()->json($specialties, 200);
    }
    /**
     * Display the specified resource.
     */
    public function show(Specialty $specialty)
    {
        return response()->json($specialty, 200);
    }
}
