<?php

namespace App\Http\Controllers\Api\Client;
use Illuminate\Support\Facades\Session;
use App\Http\Controllers\Controller;
use App\Models\Invoice;
use App\Models\InvoiceDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Exception;

class InvoiceController extends Controller
{
    public function invoice()
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

            $invoices = Invoice::with(['details.booking.doctor', 'details.booking.guest', 'details.booking.doctor.specialty'])
                ->whereHas('details.booking', function ($query) use ($guest_id) {
                    $query->where('guest_id', $guest_id);
                })
                ->get()
                ->map(function ($invoice) {
                    return [
                        'id' => $invoice->id,
                        'total_amount' => $invoice->total_amount,
                        'discount' => $invoice->discount,
                        'tax' => $invoice->tax,
                        'isDeleted' => $invoice->isDeleted,
                        'created_at' => $invoice->created_at,
                        'updated_at' => $invoice->updated_at,
                        'details' => $invoice->details->map(function ($detail) {
                            // Process doctor image if available
                            $doctorImage = null;
                            if (isset($detail->booking->doctor->doctor_avatar)) {
                                $doctorImage = $this->getImageUrl($detail->booking->doctor->doctor_avatar);
                            }

                            return [
                                'id' => $detail->id,
                                'invoice_id' => $detail->invoice_id,
                                'booking_id' => $detail->booking_id,
                                'booking_status' => $detail->booking->status ?? 'N/A',
                                'doctor' => [
                                    'doctor_name' => $detail->booking->doctor->doctor_name ?? 'N/A',
                                    'specialty_id' => $detail->booking->doctor->specialty_id ?? 'N/A',
                                    'specialty_name' => $detail->booking->doctor->specialty->name ?? 'N/A',
                                    'exp' => $detail->booking->doctor->exp ?? 'N/A',
                                    'image' => $doctorImage
                                ],
                                'guest' => [
                                    'guest_name' => $detail->booking->guest->guest_name ?? 'N/A',
                                    'gender' => $detail->booking->guest->gender ?? 'N/A',
                                    'phone' => $detail->booking->guest->guest_phone ?? 'N/A',
                                    'email' => $detail->booking->guest->guest_email ?? 'N/A'
                                ],
                                'isDeleted' => $detail->isDeleted,
                                'created_at' => $detail->created_at,
                                'updated_at' => $detail->updated_at
                            ];
                        })
                    ];
                });

            return response()->json([
                'status' => true,
                'message' => 'Invoice list retrieved successfully',
                'data' => $invoices
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => false,
                'message' => 'Error retrieving invoices: ' . $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get image URL with fallback to local storage if S3 fails
     *
     * @param string $imagePath
     * @return string
     */
    private function getImageUrl($imagePath)
    {
        if (!$imagePath) {
            return null;
        }

        if (str_starts_with($imagePath, 'http')) {
            return $imagePath;
        }

        try {
            // Try to get image from S3
            return Storage::disk('s3')->url($imagePath);
        } catch (Exception $e) {
            // Fallback to local storage if S3 fails
            return url('storage/' . $imagePath);
        }
    }
}
