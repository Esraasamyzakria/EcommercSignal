import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { get } from 'http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  _httpclient=inject(HttpClient);
  
  getProducts():Observable<any>{
    return this._httpclient.get(environment.baseurl +`/api/v1/products`);
  }
  getProductdetails(id: string):Observable<any>{
    return this._httpclient.get(environment.baseurl +`/api/v1/products/${id}`);
  }
}
