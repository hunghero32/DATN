<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Feedback;
use App\Http\Requests\StoreFeedbackRequest;
use App\Http\Requests\UpdateFeedbackRequest;

class FeedbackController extends Controller
{
    /**
     * Hiển thị danh sách phản hồi (có phân trang).
     */
    public function index()
    {
        $feedbacks = Feedback::paginate(5);
        return response()->json($feedbacks, 200);
    }

    /**
     * Lưu phản hồi mới vào cơ sở dữ liệu.
     */
    public function store(StoreFeedbackRequest $request)
    {
        $data = $request->validated();
        $feedback = Feedback::create($data);
        return response()->json([
            'message' => 'Phản hồi đã được tạo thành công.',
            'data' => $feedback
        ], 201);
    }

    /**
     * Hiển thị một phản hồi cụ thể.
     */
    public function show(Feedback $feedback)
    {
        return response()->json($feedback, 200);
    }

    /**
     * Cập nhật phản hồi.
     */
    public function update(UpdateFeedbackRequest $request, Feedback $feedback)
    {
        $data = $request->validated();
        $feedback->update($data);
        return response()->json([
            'message' => 'Cập nhật phản hồi thành công.',
            'data' => $feedback
        ], 200);
    }

    /**
     * Xóa phản hồi.
     */
    public function destroy(Feedback $feedback)
    {
        $feedback->delete();
        return response()->json(['message' => 'Xóa phản hồi thành công.'], 200);
    }
}