<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Combo extends Model
{
    use HasFactory;
    protected $fillable = [
        'clinic_id',
        'combo_avatar',
        'combo_name',
        'combo_bio',
    ];

    // Quan hệ với bảng Clinic
    public function clinic()
    {
        return $this->belongsTo(Clinic::class);
    }
}
