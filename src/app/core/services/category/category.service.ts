import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  _httpClient=inject(HttpClient);
  getCategories(): Observable<any> {
    return this._httpClient.get(environment.baseurl +`/api/v1/categories`);
  }
  getCategoriesdetails(id: string): Observable<any> {
    return this._httpClient.get(environment.baseurl +`/api/v1/categories/${id}` );
  }
}
