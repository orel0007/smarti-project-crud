<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Product extends Model
{
    use HasFactory;
    protected $fillable = [
        "name",
        "category",
        'price',
        "description",
        "is_in_stock",
    ];
    
       // Factory method to link the model to the factory
       public static function factory()
       {
           return new \Database\Factories\ProductFactory();
       }

}
