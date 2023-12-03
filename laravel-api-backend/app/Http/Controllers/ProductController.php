<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Illuminate\Support\Facades\Log;

use Validator;
class ProductController extends Controller
{
    //get all products
    public function index()
    {
        return response()->json(Product::all());
    }

    //post and insert new product
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|string|max:255',
            'category' => 'required|string|max:255',
            'price' => 'required|numeric',
            'description' => 'required|string',
            'is_in_stock' => 'required|in:Yes,No',
        ]);
        if ($validator->fails()){
            return response()->json([
                'status'=>422,
                'errors'=>$validator->messages()
            ],422);
        }
        else{
            Log::info('Request data:', ['data' => $request->all()]);
            $product = Product::create($request->all());
            return response()->json($product, 201);
        }
        
    }

    //put and update new product
        public function update(Request $request, $id)
    {
        $product = Product::find($id);
        if($product){
            $product->update($request->all());
            return response()->json([
                'status'=>200,
                'message'=>'update was succesful!'],200);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'There is no have this product!'],404);
        }
    }

    //delete exist product
    public function destroy($id){
        $product = Product::find($id);
        if($product){
            $product->delete();
            return response()->json([
                'status'=>200,
                'message'=>'delate was succesful!'],200);
        }
        else{
            return response()->json([
                'status'=>404,
                'message'=>'There is no have this product!'],404);
        }
    }
}
