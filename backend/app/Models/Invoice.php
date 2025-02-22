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
}
