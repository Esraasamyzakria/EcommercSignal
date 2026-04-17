import { Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/auth/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './forgot.component.html',
  styleUrl: './forgot.component.css',
})
export class ForgotComponent {
  _authService=inject(AuthService);
  loading=signal<boolean>(false);
  
  _router=inject(Router);
  step=signal<number>(1);
  email:FormControl=new FormControl('',[Validators.required, Validators.email]);
  code:FormControl=new FormControl('',[Validators.required, Validators.pattern(/^[0-9]{6}$/)]);
  password:FormControl=new FormControl('',[Validators.required]);
  submitEmail(e:Event):void{
    this.loading.set(true);
e.preventDefault();
if(this.email.valid){
const data={
  email:this.email.value
}
this._authService.ForgotPassword(data).subscribe({
  
  next:(res)=>{
    console.log(res);
    this.step.set(2);
    this.loading.set(false);
  },
  error:(err)=>{
    console.log(err);
    this.loading.set(false);
  }
})

}

  }
  submitCode(e:Event):void{
     this.loading.set(true);
e.preventDefault();
if(this.code.valid){
const data={
  resetCode:this.code.value
}
this._authService.ResetCode(data).subscribe({
  next:(res)=>{
    this.loading.set(false);
    console.log(res);
    this.step.set(3);
  },
  error:(err)=>{
    this.loading.set(false);
    console.log(err);
  }
})
  }
}
  submitPassword(e:Event):void{
 this.loading.set(true);
e.preventDefault();
    if(this.password.valid){
      const data={
          email:this.email.value,
        newPassword:this.password.value
      }
      this._authService.ResetPassword(data).subscribe({
  next:(res)=>{
    console.log(res);
    this.loading.set(false);
    this._router.navigate(['/login'])
    
  },
  error:(err)=>{
    console.log(err);
    this.loading.set(false);
  }
})
    }
  }
  goBackToStepOne(): void {
  this.step.set(1);
  this.code.reset(); // لمسح كود التحقق القديم إذا أردتِ ذلك
}
}
