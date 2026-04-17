import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { AuthService } from '../../core/auth/services/auth.service';
import { MassageErrorComponent } from "../../shared/ui/massage-error/massage-error.component";

@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, MassageErrorComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  _fb=inject(FormBuilder);
  _router=inject(Router);
  _authService=inject(AuthService);
  loading=signal<boolean>(false);

  loginform:FormGroup=this._fb.group({

    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],

  })

submitlogin():void{
  if (this.loginform.valid) {
    this.loading.set(true);
     console.log(this.loginform.value);  
     this._authService.signin(this.loginform.value).subscribe({
       next: (response) => {
         console.log(response);
         this.loading.set(false);
         this.loginform.reset();
            if(response.message =='success'){
              this.loading.set(false);
                       localStorage.setItem('token',response.token)
         localStorage.setItem('username',JSON.stringify(response.user))
         this._authService.isloading.set(true);
         console.log(this._authService.isloading());
              this._router.navigate(['/'])
       }
       }
     });
  }
  else{
    this.loading.set(false);
    this.loginform.markAllAsTouched()
  }

}
}
