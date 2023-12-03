import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  constructor(private _http: HttpClient) { }
  addProduct(data: any) : Observable<any>{
    return this._http.post('http://127.0.0.1:8000/api/products', data);
  }

  getProductsList() : Observable<any>{
    return this._http.get('http://127.0.0.1:8000/api/products');
  }

  deleteProduct(id: number) : Observable<any>{
    return this._http.delete('http://127.0.0.1:8000/api/products/' +id );
  }

  updateProduct(id:number, data: any) : Observable<any>{
    return this._http.put('http://127.0.0.1:8000/api/products/'+id, data);
  }
  
}
