<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;
    protected $fillable = [
        'parent_id',
        'name',
        'description',
    ];
    public function parent() // Quan hệ danh mục cha
    {
        return $this->belongsTo(Category::class, 'parent_id'); // Một danh mục có thể có một danh mục cha
    }

    public function children() // Quan hệ danh mục con
    {
        return $this->hasMany(Category::class, 'parent_id'); // Một danh mục có thể có nhiều danh mục con
    }
}
