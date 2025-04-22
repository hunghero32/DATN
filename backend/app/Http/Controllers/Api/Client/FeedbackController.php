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


    public function index()
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn cần đăng nhập để xem feedback.'
            ], 401);
        }


        $guest = Guest::where('user_id', $user->id)->pluck('id');

        if ($guest->isEmpty()) {
            return response()->json([
                'status' => false,
                'message' => 'Không tìm thấy thông tin khách hàng.'
            ], 400);
        }


        $feedbacks = Feedback::whereIn('guest_id', $guest)
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
                'rating' => 'required|integer|min:1|max:5',
                'comments' => 'required|string|max:255',
                'status' => 'nullable|in:pending,approved,rejected',
            ]);


            $user = auth()->user();
            if (!$user) {
                return response()->json(['status' => false, 'message' => 'Bạn cần đăng nhập để gửi feedback.'], 401);
            }


            $guests = Guest::where('user_id', $user->id)->get();


            if ($guests->isEmpty()) {
                return response()->json(['status' => false, 'message' => 'Không tìm thấy thông tin khách hàng.'], 400);
            }


            $createdFeedbacks = [];

            foreach ($guests as $guest) {

                if (!Booking::where([['guest_id', $guest->id], ['service_id', $validatedData['service_id']], ['status', 'confirmed']])->exists()) {
                    continue;
                }


                if (Feedback::where([['guest_id', $guest->id], ['service_id', $validatedData['service_id']]])->exists()) {
                    return response()->json(['status' => false, 'message' => 'Bạn đã gửi feedback cho dịch vụ này rồi.'], 400);
                }


                $feedback = Feedback::create([
                    'guest_id' => $guest->id,
                    'service_id' => $validatedData['service_id'],
                    'rating' => $validatedData['rating'],
                    'comments' => $validatedData['comments'],
                    'status' => $validatedData['status']  ?? 'approved',
                ]);

                $createdFeedbacks[] = $feedback;
            }

            if ($createdFeedbacks) {
                return response()->json(['status' => true, 'message' => 'Đã gửi feedback thành công!', 'data' => $createdFeedbacks], 201);
            }

            return response()->json(['status' => false, 'message' => 'Không có feedback nào được tạo.'], 400);
        } catch (\Exception $e) {
            return response()->json(['status' => false, 'message' => 'Đã xảy ra lỗi.', 'error' => $e->getMessage()], 500);
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


        $guests = Guest::where('user_id', $user->id)->pluck('id')->toArray();


        if (empty($guests)) {
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


        if (!in_array($feedback->guest_id, $guests)) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn không có quyền chỉnh sửa feedback này.'
            ], 403);
        }

        if ($feedback->created_at->diffInDays(now()) > 7) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn chỉ có thể chỉnh sửa feedback trong vòng 7 ngày sau khi tạo.'
            ], 403);
        }


        $feedback->update($request->only(['rating', 'comments', 'status']));

        return response()->json([
            'status' => true,
            'message' => 'Cập nhật feedback thành công!',
            'data' => $feedback
        ], 200);
    }





    public function destroy($id)
    {
        $user = auth()->user();
        if (!$user) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn cần đăng nhập để xóa feedback.'
            ], 401);
        }


        $guests = Guest::where('user_id', $user->id)->pluck('id')->toArray();


        if (empty($guests)) {
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


        if (!in_array($feedback->guest_id, $guests)) {
            return response()->json([
                'status' => false,
                'message' => 'Bạn không có quyền xóa feedback này.'
            ], 403);
        }


        $feedback->update(['isDeleted' => 1]);

        return response()->json([
            'status' => true,
            'message' => 'Xóa feedback thành công!'
        ], 200);
    }
}
