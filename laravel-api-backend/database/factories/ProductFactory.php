<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;
    
    public function definition()
    {
        return [
            'name' => $this->faker->word,
            'category' => $this->faker->word,
            'price' => fake()->numberBetween(0,1000),
            'description' => $this->faker->sentence,
            'is_in_stock' =>  fake()->randomElement(['Yes', 'No']),
        ];
    }
}
