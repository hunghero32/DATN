<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\DoctorSpecialty;

class DoctorSpecialtyController extends Controller
{
    public function index()
    {
        $doctorSpecialties = DoctorSpecialty::with(['doctor', 'specialty'])->paginate(5);
        return response()->json($doctorSpecialties, 200);
    }
    public function show(DoctorSpecialty $doctorSpecialty)
    {
        return response()->json($doctorSpecialty, 200);
    }
}
