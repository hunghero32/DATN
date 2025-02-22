<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Services extends Model
{
    use HasFactory;
    protected $fillable = [
        'specialty_id',
        'category_id',
        'services_name',
        'description',
        'price',
        'duration',
        'status',
    ];

    // Quan hệ với bảng Specialty
    public function specialty()
    {
        return $this->belongsTo(Specialty::class);
    }

    // Quan hệ với bảng Category
    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
