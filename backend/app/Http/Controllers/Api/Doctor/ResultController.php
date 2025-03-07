<?php

namespace App\Http\Controllers\Api\Doctor;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Result;
use App\Models\Booking;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreResultRequest;
use App\Http\Requests\UpdateResultRequest;

class ResultController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $results = Result::with(['guest', 'doctor', 'booking'])
            ->where('doctor_id', auth()->id())
            ->searchGuest($request->search)          // Tìm theo tên, sđt, email khách hàng
            ->filterBookingDate($request->booking_date) // Lọc theo ngày đặt lịch
            ->filterBookingTime($request->booking_time) // Lọc theo giờ đặt lịch
            ->paginate(10);

        if ($results->isEmpty()) {
            return response()->json([
                'message' => 'Không tìm thấy kết quả phù hợp.'
            ], 200);
        }

        return response()->json($results, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreResultRequest $request)
    {
        $data = $request->validated();
        if (isset($data['booking_id'])) {
            $booking = Booking::find($data['booking_id']);
            if (!$booking) {
                return response()->json([
                    'message' => 'Booking không hợp lệ.'
                ], 404);
            }
        } else {
            // Nếu không có booking_id, tìm booking gần nhất của bệnh nhân
            $booking = Booking::where('guest_id', $request->input('guest_id'))
                ->where('status', 'confirmed')
                ->whereDate('booking_date', today())
                ->whereTime('booking_time', '>=', now()->format('H:i:s'))
                ->orderBy('booking_date', 'asc')
                ->orderBy('booking_time', 'asc')
                ->first();
            if (!$booking) {
                return response()->json([
                    'message' => 'Không tìm thấy booking phù hợp.'
                ], 404);
            }
            $data['booking_id'] = $booking->id;
        }
        $data['doctor_id'] = $booking->doctor_id;
        $data['guest_id'] = $booking->guest_id;
        if ($request->hasFile('file')) {
            $data['file'] = $request->file('file')->store('results', 'public');
        }
        $result = Result::create($data);
        return response()->json([
            'message' => 'Tạo kết quả thành công.',
            'data' => $result
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($result)
    {
        return response()->json($result->load(['guest', 'doctor', 'booking']), 200);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateResultRequest $request, Result $result)
    {
        if ($result->doctor_id !== auth()->id()) {
            return response()->json(['message' => 'Bạn không có quyền chỉnh sửa kết quả này.'], 403);
        }
        $data = $request->validated();
        if ($request->hasFile('file')) {
            if ($result->file) {
                Storage::disk('public')->delete($result->file);
            }
            $data['file'] = $request->file('file')->store('results', 'public');
        }
        $result->update($data);
        return response()->json([
            'message' => 'Cập nhật kết quả thành công.',
            'data' => $result
        ], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($result)
    {
        if ($result->doctor_id !== auth()->id()) {
            return response()->json(['message' => 'Bạn không có quyền xóa kết quả này.'], 403);
        }  
        if ($result->file) {
            Storage::disk('public')->delete($result->file);
        }
        $result->delete();
        return response()->json(['message' => 'Xóa kết quả thành công.'], 200);
    }
}
