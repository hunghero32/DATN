<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;
use App\Models\Feedback;
use App\Models\Booking;
use App\Models\Guest;
use Illuminate\Support\Facades\Log;


class FeedbackController extends Controller
{
    // Lấy danh sách feedback của người dùng
    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn cần đăng nhập để xem feedback.'
            ], 401);
        }

        // Lấy guest_id từ users hoặc bảng guests
        $guestId = $user->guest_id ?? Guest::where('user_id', $user->id)->value('id');
        if (!$guestId) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin khách hàng.'
            ], 400);
        }

        // Lấy danh sách feedback của guest_id
        $feedbacks = Feedback::where('guest_id', $guestId)
            ->where('isDeleted', 0)
            ->get();

        return response()->json([
            'status' => true,
            'message' => 'Danh sách feedback',
            'data' => $feedbacks
        ], 200);
    }
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'service_id' => 'required|exists:services,id',
                'booking_id' => 'required|exists:bookings,id', // Add booking_id validation
                'rating' => 'required|integer|min:1|max:5',
                'comments' => 'required|string|max:255',
                'status' => 'nullable',
            ]);

            $user = auth()->user();
            if (!$user) {
                return response()->json(['status' => false, 'message' => 'Bạn cần đăng nhập để gửi feedback.'], 401);
            }

            $guestId = $user->guest_id ?? Guest::where('user_id', $user->id)->value('id');
            if (!$guestId) {
                return response()->json(['status' => false, 'message' => 'Không tìm thấy thông tin khách hàng.'], 400);
            }

            // Check if the booking exists and is completed
            $booking = Booking::where([
                ['id', $validatedData['booking_id']],
                ['guest_id', $guestId],
                ['service_id', $validatedData['service_id']],
                ['status', 'completed']
            ])->first();

            if (!$booking) {
                return response()->json(['status' => false, 'message' => 'Bạn chỉ có thể đánh giá sau khi hoàn thành dịch vụ.'], 400);
            }

            // Check if feedback already exists
            if (Feedback::where([
                ['guest_id', $guestId],
                ['service_id', $validatedData['service_id']]
            ])->exists()) {
                return response()->json(['status' => false, 'message' => 'Bạn đã gửi đánh giá cho dịch vụ này.'], 400);
            }

            // Create feedback
            $feedback = Feedback::create([
                'guest_id' => $guestId,
                'service_id' => $validatedData['service_id'],
                'booking_id' => $validatedData['booking_id'], // Add booking_id
                'rating' => $validatedData['rating'],
                'comments' => $validatedData['comments'],
                'status' => $validatedData['status'] ?? 'pending',
            ]);

            return response()->json(['status' => true, 'message' => 'Thêm feedback thành công!', 'data' => $feedback], 201);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Đã xảy ra lỗi khi thêm feedback.', 'error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn cần đăng nhập để cập nhật feedback.'
            ], 401);
        }

        // Lấy guest_id của người dùng
        $guestId = $user->guest_id ?? Guest::where('user_id', $user->id)->value('id');

        // Nếu không có guest_id
        if (!$guestId) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin khách hàng.'
            ], 400);
        }

        $feedback = Feedback::find($id);
        if (!$feedback) {
            return response()->json([
                'status' => false,
                'message' => 'Feedback không tồn tại.'
            ], 404);
        }


        // Kiểm tra quyền chỉnh sửa feedback
        if ($feedback->guest_id !== $guestId) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn không có quyền chỉnh sửa feedback này.'
            ], 403);
        }

        // Kiểm tra thời gian chỉnh sửa (7 ngày)
        if ($feedback->created_at->diffInDays(now()) > 7) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn chỉ có thể chỉnh sửa feedback trong vòng 7 ngày sau khi tạo.'
            ], 403);
        }

        // Cập nhật feedback
        $feedback->update($request->only(['rating', 'comments', 'status']));

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật feedback thành công!',
            'data' => $feedback
        ], 200);
    }



    // Xóa mềm feedback
    public function destroy($id)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn cần đăng nhập để xóa feedback.'
            ], 401);
        }

        // Lấy guest_id của người dùng
        $guestId = $user->guest_id ?? Guest::where('user_id', $user->id)->value('id');

        // Nếu không có guest_id
        if (!$guestId) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin khách hàng.'
            ], 400);
        }

        $feedback = Feedback::find($id);
        if (!$feedback || $feedback->isDeleted) {
            return response()->json([
                'status' => false,
                'message' => 'Feedback không tồn tại hoặc đã bị xóa.'
            ], 404);
        }

        // Log::debug('User ID: ' . $user->id);
        // Log::debug('User Guest ID: ' . $guestId);
        // Log::debug('Feedback Guest ID: ' . $feedback->guest_id);

        // Kiểm tra quyền xóa feedback
        if ($feedback->guest_id !== $guestId) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn không có quyền xóa feedback này.'
            ], 403);
        }

        // Thực hiện xóa mềm (đánh dấu isDeleted = 1)
        $feedback->update(['isDeleted' => 1]);

        return response()->json([
            'status' => true,
            'message' => 'Xóa feedback thành công!'
        ], 200);
    }
}
