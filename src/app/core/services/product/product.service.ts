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
  
  getProducts(pagenumber:number = 1):Observable<any>{
    return this._httpclient.get(environment.baseurl +`/api/v1/products?page=${pagenumber}`);
  }
  getProductdetails(id: string):Observable<any>{
    return this._httpclient.get(environment.baseurl +`/api/v1/products/${id}`);
  }
}
