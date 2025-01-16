<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class System extends Model
{
    use HasFactory;
    protected $fillable = [
        'site_name',
        'site_description',
        'site_keywords',
        'site_logo',
        'site_favicon',
        'site_url',
        'meta_tags',
        'default_language',
        'timezone',
        'tracking_code',
    ];
}
