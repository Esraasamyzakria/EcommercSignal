import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
   import { jwtDecode } from "jwt-decode";
import { isPlatformBrowser } from '@angular/common';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  _httpClient=inject(HttpClient);
  _PLATFORM_ID=inject(PLATFORM_ID);
  _router=inject(Router);
isloading=signal<boolean>(false);

signout():void{
  localStorage.removeItem('token');
  localStorage.removeItem('username');
  localStorage.removeItem('setData');
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

  decodeUser(){
 
if(isPlatformBrowser(this._PLATFORM_ID)){
const token = localStorage.getItem('token');
if(token){
  const decoded = jwtDecode(token);
  localStorage.setItem('setData',JSON.stringify(decoded));
  console.log(decoded);
}
}


  }
}
