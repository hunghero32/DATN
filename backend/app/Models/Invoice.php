<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    use HasFactory;
    protected $fillable = [
        'total_amount',
        'discount',
        'tax',
        'status',
        'isDeleted'
    ];

    /**
     * Tính tổng tiền sau khi áp dụng giảm giá và thuế.
     *
     * @return float
     */
    public function calculateFinalAmount()
    {
        return $this->total_amount - $this->discount + $this->tax;
    }
    public function details()
    {
        return $this->hasMany(InvoiceDetail::class);
    }
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
    public function scopeSearch($query, $search)
    {
        if ($search) {
            return $query->where(function ($q) use ($search) {
                $q->whereHas('details.booking.guest', function ($q) use ($search) {
                    $q->where('guest_name', 'like', "%$search%")
                      ->orWhere('guest_phone', 'like', "%$search%");
                })
                ->orWhereHas('details.booking.service', function ($q) use ($search) {
                    $q->where('services_name', 'like', "%$search%");
                });
            });
        }
        return $query;
    }
    public function scopeFilterDate($query, $date)
    {
        if ($date) {
            return $query->whereHas('details.booking', function ($q) use ($date) {
                $q->whereDate('booking_date', $date);
            });
        }
        return $query;
    }
}
