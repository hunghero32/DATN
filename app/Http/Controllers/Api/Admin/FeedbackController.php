<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Feedback;

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
     * Hiển thị một phản hồi cụ thể.
     */
    public function show(Feedback $feedback)
    {
        return response()->json($feedback, 200);
    }
}