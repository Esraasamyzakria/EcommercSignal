import { Observable } from 'rxjs';
import { date } from './../../../../../.kilo/node_modules/zod/src/v4/core/regexes';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient=inject(HttpClient);
  _router=inject(Router);
isloading=signal<boolean>(false);

signout():void{
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  this.isloading.set(false);
  this._router.navigate(['/login']);

}
  signup(date:object):Observable<any>{
    return this._httpClient.post(environment.baseurl +`/api/v1/auth/signup`,date);
  }
  signin(date:object):Observable<any>{
    return this._httpClient.post(environment.baseurl +`/api/v1/auth/signin`,date);
  }
  ForgotPassword(date:object):Observable<any>{
    return this._httpClient.post(environment.baseurl +`/api/v1/auth/forgotPasswords`,date);
  }
  ResetCode (date:object):Observable<any>{
    return this._httpClient.post(environment.baseurl +`/api/v1/auth/verifyResetCode`,date);
  }
  ResetPassword(date:object):Observable<any>{
    return this._httpClient.put(environment.baseurl +`/api/v1/auth/resetPassword`,date);
  }
}
