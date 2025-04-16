<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Doctor;
use Illuminate\Http\Request;

class DoctorController extends Controller
{
    public function index()
    {
        $data = Doctor::where('isDeleted', 0)->get();
        return response()->json(['doctors' => $data]);
    }
    public function search(Request $request)
    {
        $exp = $request->input('exp');
        $search = $request->input('search');

        $query = Doctor::where('isDeleted', 0);

        if (!empty($exp)) {
            if ($exp === '0-5') {
                $query->whereBetween('exp', [0, 5]);
            } elseif ($exp === '6-10') {
                $query->whereBetween('exp', [6, 10]);
            } elseif ($exp === '10+') {
                $query->where('exp', '>', 10);
            }
        }

        if (!empty($search)) {
            $query->where('doctor_name', 'like', "%$search%");
        }

        return response()->json(['doctors' => $query->get()]);
    }
    public function show($id)
    {
        $doctor = Doctor::findOrFail($id);
        return response()->json(['doctor' => $doctor]);
    }
}
