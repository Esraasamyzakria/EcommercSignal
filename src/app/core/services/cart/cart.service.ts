import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _httpClient=inject(HttpClient)
  addProductToCart(prodId:string): Observable<any> {
    return this._httpClient.post(environment.baseurl +`/api/v2/cart`, { 
  productId: prodId
 });
  }
  getproductcart(): Observable<any> {
    return this._httpClient.get(environment.baseurl +`/api/v2/cart`);
  }
  removeProductFromCart(prodId:string): Observable<any> {
    return this._httpClient.delete(environment.baseurl +`/api/v2/cart/${prodId}`);
  }
  updateProductInCart(prodId:string, quantity:number): Observable<any> {
    return this._httpClient.put(environment.baseurl +`/api/v2/cart/${prodId}`, {
      count: quantity });
  }
  clearProductInCart(): Observable<any> {
    return this._httpClient.delete(environment.baseurl +`/api/v2/cart`);
  }
}
