<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Post extends Model
{
    use HasFactory, SoftDeletes; // Kích hoạt chức năng xóa mềm

    protected $fillable = [
        'category_id',
        'user_id',
        'slug',
        'title',
        'content',
        'views',
        'status',
        'published_at',
        'isDeleted',
    ];

    protected $casts = [
        'published_at' => 'datetime',
    ];

    // Quan hệ với bảng Category
    public function category()
    {
        return $this->belongsTo(Category::class,'category_id');
    }

    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class,'user_id');
    }

}
