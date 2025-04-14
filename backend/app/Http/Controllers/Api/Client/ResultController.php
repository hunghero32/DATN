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

            // Get result for specific booking ID and authenticated user
            $result = Result::with(['booking', 'doctor', 'guest'])
                ->whereHas('guest', function($query) use ($userId) {
                    $query->where('user_id', $userId);
                })
                ->where('booking_id', $request->booking_id)
                ->where('isDeleted', 0)
                ->first();

            if (!$result) {
                return response()->json([
                    'status' => false,
                    'message' => 'Không tìm thấy kết quả khám bệnh'
                ], 404);
            }

            $formattedResult = [
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

            return response()->json([
                'status' => true,
                'message' => 'Lấy kết quả khám bệnh thành công',
                'data' => $formattedResult
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi lấy kết quả khám bệnh: ' . $e->getMessage()
            ], 500);
        }
    }
}
