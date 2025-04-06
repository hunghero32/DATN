<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Doctor;
use App\Models\Schedule;

class DoctorController extends Controller
{
    public function detailDoctor($id)
    {
        try {
            $doctor = Doctor::with([
                'specialty',
                'services' => function($query) use ($id) {
                    $currentDate = now()->format('Y-m-d');
                    $twoHoursFromNow = now()->addHours(2)->format('H:i:s');

                    $query->where('services.status', 1)
                         ->where('services.isDeleted', 0)
                         ->with(['doctorServices' => function($q) use ($id) {
                             $q->where('doctor_id', $id)
                               ->where('isDeleted', 0);
                         }]);
                }
            ])
                ->where('doctors.id', $id)
                ->where('doctors.isDeleted', 0)
                ->where('doctors.approve', 1)
                ->first();

            if (!$doctor) {
                return response()->json([
                    'status' => 404,
                    'message' => 'Doctor not found',
                ], 404);
            }

            // Get schedules for each service
            foreach ($doctor->services as $service) {
                $service->available_schedules = Schedule::where('doctor_id', $id)
                    ->where('isDeleted', 0)
                    ->where('working_date', '>=', now()->format('Y-m-d'))
                    ->where(function($q) {
                        $currentDate = now()->format('Y-m-d');
                        $twoHoursFromNow = now()->addHours(2)->format('H:i:s');

                        $q->where('working_date', '>', $currentDate)
                            ->orWhere(function($subQ) use ($currentDate, $twoHoursFromNow) {
                                $subQ->where('working_date', $currentDate)
                                    ->where('time_start', '>', $twoHoursFromNow);
                            });
                    })
                    ->orderBy('working_date', 'asc')
                    ->orderBy('time_start', 'asc')
                    ->get();
            }

            return response()->json([
                'status' => 200,
                'message' => 'success',
                'data' => $doctor
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 500,
                'message' => 'Internal server error',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
