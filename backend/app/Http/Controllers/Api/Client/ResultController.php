<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;
use Illuminate\Support\Facades\Session;

class ResultController extends Controller
{
    public function result()
    {
        try {
            // Get guest information from session
            $lastBooking = Session::get('last_booking_guest');

            if (!$lastBooking) {
                return response()->json([
                    'status' => false,
                    'message' => 'Guest information not found'
                ], 404);
            }

            $guest_id = $lastBooking['guest_id'];

            $results = Result::with(['booking', 'doctor', 'guest'])
                ->where('guest_id', $guest_id)
                ->where('isDeleted', 0)
                ->get()
                ->map(function ($result) {
                    return [
                        'id' => $result->id,
                        'booking_id' => $result->booking_id,
                        'doctor' => [
                            'id' => $result->doctor->id ?? null,
                            'doctor_name' => $result->doctor->doctor_name ?? 'N/A',
                            'specialty' => $result->doctor->specialty->specialty_name ?? 'N/A'
                        ],
                        'guest' => [
                            'guest_name' => $result->guest->guest_name ?? 'N/A',
                            'gender' => $result->guest->gender ?? 'N/A',
                            'phone' => $result->guest->guest_phone ?? 'N/A'
                        ],
                        'diagnosis' => $result->diagnosis,
                        'prescription' => $result->prescription,
                        'note' => $result->note,
                        'file' => $result->file,
                        'created_at' => $result->created_at,
                        'updated_at' => $result->updated_at
                    ];
                });

            return response()->json([
                'status' => true,
                'message' => 'Medical results retrieved successfully',
                'data' => $results
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error retrieving medical results: ' . $e->getMessage()
            ], 500);
        }
    }
}
