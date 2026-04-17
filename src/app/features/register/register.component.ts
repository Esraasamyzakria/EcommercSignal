import { Component, inject, signal } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from "@angular/router";
import { MassageErrorComponent } from "../../shared/ui/massage-error/massage-error.component";
import { group } from 'console';
import { AuthService } from '../../core/auth/services/auth.service';

@Component({
  selector: 'app-register',
  imports: [RouterLink, ReactiveFormsModule, MassageErrorComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  _fb=inject(FormBuilder);
  _router=inject(Router);
  _authService=inject(AuthService);
  loading=signal<boolean>(false);

  registerform:FormGroup=this._fb.group({
    name:['', [Validators.required, Validators.minLength(3)]],
    email:['', [Validators.required, Validators.email]],
    password:['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    rePassword:['', [Validators.required]],
    phone:['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]],

  }, { validators: this.passwordMatchValidator })
  passwordMatchValidator(form: AbstractControl) {
  const password = form.get('password')?.value;
  const confirm = form.get('rePassword')?.value;

if(password !==confirm && confirm !== ''){
form.get('rePassword')?.setErrors({ mismatch: true });
return { mismatch: true };
}
return null;
}
submitRegister():void{
  if (this.registerform.valid) {
     this.loading.set(true);
     console.log(this.registerform.value);  
     this._authService.signup(this.registerform.value).subscribe({
       next: (response) => {
         console.log(response);
         this.registerform.reset();
            if(response.message =='success'){
                this.loading.set(false);
              this._router.navigate(['/login'])
       }
       }
     });
  }
  else{
   this.loading.set(false);
    this.registerform.markAllAsTouched()
  }

}

}
