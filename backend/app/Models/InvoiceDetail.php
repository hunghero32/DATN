<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class InvoiceDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'invoice_id',
        'booking_id',
    ];

    // Quan hệ với bảng Invoice
    public function invoice()
    {
        return $this->belongsTo(Invoice::class);
    }

    // Quan hệ với bảng Booking
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }
}