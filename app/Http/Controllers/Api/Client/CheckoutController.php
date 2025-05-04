<?php

namespace App\Http\Controllers\Api\Client;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class CheckoutController extends Controller
{
    function execPostRequest($url, $data)
    {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                'Content-Type: application/json',
                'Content-Length: ' . strlen($data))
        );
        curl_setopt($ch, CURLOPT_TIMEOUT, 5);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);
        //execute post
        $result = curl_exec($ch);
        //close connection
        curl_close($ch);
        return $result;
    }

    public function momoPayment(Request $request)
    {
        // Make sure amount is an integer
        $amount = (int)$request->amount;

        // Validate the request
        if (!$amount || $amount < 1000) {
            return response()->json([
                'status' => false,
                'message' => 'Số tiền thanh toán không hợp lệ (tối thiểu 1,000 VND)'
            ], 400);
        }

        $endpoint = "https://test-payment.momo.vn/v2/gateway/api/create";

        $partnerCode = 'MOMOBKUN20180529';
        $accessKey = 'klm05TvNBzhg7h7j';
        $secretKey = 'at67qH6mk8w5Y1nAyMoYKMWACiEi2bsa';
        $orderInfo = $request->order_info ?? "Thanh toán qua MoMo";
        $orderId = time() . "";
        $redirectUrl = $request->return_url ?? "https://quickcare.asia/";
        $ipnUrl = "https://quickcare.asia/api/client/momo-callback";
        $extraData = "";

        $requestId = time() . "";
        // $requestType = "captureWallet";
        $requestType = "payWithATM";

        // Before sign HMAC SHA256 signature
        $rawHash = "accessKey=" . $accessKey . "&amount=" . $amount . "&extraData=" . $extraData . "&ipnUrl=" . $ipnUrl . "&orderId=" . $orderId . "&orderInfo=" . $orderInfo . "&partnerCode=" . $partnerCode . "&redirectUrl=" . $redirectUrl . "&requestId=" . $requestId . "&requestType=" . $requestType;
        $signature = hash_hmac("sha256", $rawHash, $secretKey);

        $data = array(
            'partnerCode' => $partnerCode,
            'partnerName' => "Test",
            "storeId" => "MomoTestStore",
            'requestId' => $requestId,
            'amount' => $amount,
            'orderId' => $orderId,
            'orderInfo' => $orderInfo,
            'redirectUrl' => $redirectUrl,
            'ipnUrl' => $ipnUrl,
            'lang' => 'vi',
            'extraData' => $extraData,
            'requestType' => $requestType,
            'signature' => $signature
        );

        try {
            $result = $this->execPostRequest($endpoint, json_encode($data));
            $jsonResult = json_decode($result, true);  // decode json

            // Log the request and response for debugging
            \Illuminate\Support\Facades\Log::info('MoMo Payment Request', [
                'request' => $data,
                'response' => $jsonResult
            ]);

            // Return the payment URL to the frontend
            if (isset($jsonResult['payUrl'])) {
                return response()->json([
                    'status' => true,
                    'message' => 'Tạo đơn hàng thành công',
                    'payUrl' => $jsonResult['payUrl']
                ]);
            } else {
                return response()->json([
                    'status' => false,
                    'message' => 'Không thể tạo đơn hàng',
                    'error' => $jsonResult['message'] ?? 'Unknown error',
                    'details' => $jsonResult
                ], 400);
            }
        } catch (\Exception $e) {
            \Illuminate\Support\Facades\Log::error('MoMo Payment Error', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString()
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Lỗi khi kết nối với MoMo: ' . $e->getMessage()
            ], 500);
        }
    }

    public function momoCallback(Request $request)
    {
        \Illuminate\Support\Facades\Log::info('MoMo Callback Entry Point', [
            'request_method' => $request->method(),
            'request_data' => $request->all(),
            'headers' => $request->headers->all()
        ]);

        // Log the callback data
        \Illuminate\Support\Facades\Log::info('MoMo Callback Received', [
            'data' => $request->all()
        ]);

        // Verify the callback data
        $resultCode = $request->resultCode;
        $orderId = $request->orderId;
        $amount = $request->amount;
        $orderInfo = $request->orderInfo;
        $transId = $request->transId;
        $orderType = $request->orderType;

        // Check if payment was successful (resultCode = 0 means success)
        if ($resultCode == 0) {
            try {
                // Extract booking_id from orderInfo if available
                $bookingId = null;
                $invoice = null;
                if (preg_match('/Thanh toán hóa đơn #(\d+)/', $orderInfo, $matches)) {
                    $invoiceId = $matches[1];
                    \Illuminate\Support\Facades\Log::info('Extracted invoiceId', ['invoiceId' => $invoiceId]);
                    $invoice = \App\Models\Invoice::find($invoiceId);
                    if ($invoice) {
                        $bookingId = $invoice->booking_id;
                        \Illuminate\Support\Facades\Log::info('Found invoice', ['invoiceId' => $invoiceId, 'bookingId' => $bookingId]);
                    } else {
                        \Illuminate\Support\Facades\Log::warning('Invoice not found', ['invoiceId' => $invoiceId]);
                    }
                } else {
                    \Illuminate\Support\Facades\Log::warning('Failed to extract invoiceId from orderInfo', ['orderInfo' => $orderInfo]);
                }

                // Update invoice status to 'paid'
                if ($invoice) {
                    try {
                        $invoice->status = 'paid';
                        $invoice->save();
                        \Illuminate\Support\Facades\Log::info('Invoice status updated successfully', [
                            'invoice_id' => $invoice->id,
                            'status' => $invoice->status
                        ]);
                    } catch (\Exception $e) {
                        \Illuminate\Support\Facades\Log::error('Failed to update invoice status', [
                            'invoice_id' => $invoice->id,
                            'error' => $e->getMessage()
                        ]);
                    }
                }

                // Update booking payment status if we found the booking
                if ($bookingId) {
                    $booking = \App\Models\Booking::find($bookingId);
                    if ($booking) {
                        $booking->payment_status = 'paid';
                        $booking->payment_method = 'momo';
                        $booking->payment_transaction_id = $transId;
                        $booking->payment_amount = $amount;
                        $booking->payment_time = now();
                        $booking->save();

                        \Illuminate\Support\Facades\Log::info('Payment updated successfully', [
                            'booking_id' => $bookingId,
                            'transaction_id' => $transId
                        ]);
                    }
                }

                // Return success response to MoMo
                return response()->json([
                    'status' => true,
                    'message' => 'Payment processed successfully'
                ]);

            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error('Error processing MoMo callback', [
                    'error' => $e->getMessage(),
                    'trace' => $e->getTraceAsString()
                ]);

                // Still return success to MoMo to prevent retries
                return response()->json([
                    'status' => true,
                    'message' => 'Received but error in processing'
                ]);
            }
        } else {
            // Payment failed
            \Illuminate\Support\Facades\Log::warning('MoMo payment failed', [
                'resultCode' => $resultCode,
                'message' => $request->message ?? 'Unknown error'
            ]);

            return response()->json([
                'status' => false,
                'message' => 'Payment failed: ' . ($request->message ?? 'Unknown error')
            ]);
        }
    }
}
