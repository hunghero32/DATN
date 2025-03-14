<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Builder;

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
        return $this->belongsTo(Category::class, 'category_id');
    }

    // Quan hệ với bảng User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }
    // Scope tìm kiếm theo title và content
    public function scopeSearch(Builder $query, $search)
    {
        return $query->when($search, function ($q) use ($search) {
            $q->where('title', 'like', "%$search%")
                ->orWhere('content', 'like', "%$search%");
        });
    }

    // Scope lọc theo category, status, published_at
    public function scopeFilter(Builder $query, $filters)
    {
        return $query->when($filters['category_id'] ?? null, fn($q, $id) => $q->where('category_id', $id))
            ->when($filters['status'] ?? null, fn($q, $status) => $q->where('status', $status))
            ->when($filters['published_at'] ?? null, fn($q, $date) => $q->whereDate('published_at', $date));
    }
}
