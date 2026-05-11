import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  _httpClient=inject(HttpClient)
  cartCount=signal<number>(0);
  createcashorder(paymentId:string,data:object):Observable<any>{
    return this._httpClient.post(environment.baseurl+`/api/v1/orders/${paymentId}`,data);
  }
  createvisaorder(paymentId:string,data:object):Observable<any>{
    return this._httpClient.post(environment.baseurl+`/api/v1/orders/checkout-session/${paymentId}?${environment.url}`,data);
  }
  addProductToCart(prodId:string): Observable<any> {
    return this._httpClient.post(environment.baseurl +`/api/v2/cart`, { 
  productId: prodId
 });
  }
  getUserOrder(userId:string): Observable<any> {
    return this._httpClient.get(environment.baseurl +`/api/v1/orders/user/${userId}`);
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
