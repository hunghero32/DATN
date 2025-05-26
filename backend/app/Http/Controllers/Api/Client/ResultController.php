<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\Guest;

class ResultController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:sanctum');
    }

    public function result(Request $request)
    {
        try {
            // Get authenticated user's ID
            $userId = auth()->id();

            // Validate booking_id
            if (!$request->booking_id) {
                return response()->json([
                    'status' => false,
                    'message' => 'Booking ID is required'
                ], 400);
            }

            // Get results for specific booking ID and authenticated user
            $results = Result::with(['booking', 'doctor.specialty', 'guest'])
                ->where('booking_id', $request->booking_id)
                ->where('isDeleted', 0)
                ->whereHas('guest', function ($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->first();

            if (!$results) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy kết quả khám bệnh'
                ], 404);
            }

            // Format results
            $formattedResult = [
                'id' => $results->id,
                'booking_id' => $results->booking_id,
                'doctor' => [
                    'id' => $results->doctor->id ?? null,
                    'doctor_name' => $results->doctor->doctor_name ?? 'N/A',
                    'specialty' => $results->doctor->specialty->name ?? 'N/A',
                    'exp' => $results->doctor->exp ?? 'N/A',
                ],
                'guest' => [
                    'guest_name' => $results->guest->guest_name ?? 'N/A',
                    'gender' => $results->guest->gender ?? 'N/A',
                    'phone' => $results->guest->guest_phone ?? 'N/A'
                ],
                'diagnosis' => $results->diagnosis,
                'prescription' => $results->prescription,
                'note' => $results->note,
                'file' => $results->file,
                'created_at' => $results->created_at,
                'updated_at' => $results->updated_at
            ];

            return response()->json([
                'status' => true,
                'message' => 'Lấy kết quả khám bệnh thành công',
                'data' => [$formattedResult]
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi lấy kết quả khám bệnh: ' . $e->getMessage()
            ], 500);
        }
    }
}
