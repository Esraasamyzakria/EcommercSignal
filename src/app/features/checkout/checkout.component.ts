import { Component, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart/cart.service';


@Component({
  selector: 'app-checkout',
  imports: [RouterLink ,ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent  implements OnInit{
  _activatedRoute=inject(ActivatedRoute);
  _router=inject(Router)
  _cartService=inject(CartService);
  _fb=inject(FormBuilder);
  flag=signal<string>('cash')
  cartid=signal<string>('')
 ngOnInit(): void {
   this.getCartId()
 }
 getCartId(){
this._activatedRoute.paramMap.subscribe((params) => {
     this.cartid.set(params.get('id')!)
   })
 }
 checkoutforms:FormGroup= this._fb.group({
  shippingAddress:this._fb.group({
    details:['' , [Validators.required]],
    phone:['' , [Validators.required]],
    city:['' , [Validators.required]],
  })
 })
 changeFlag(el:HTMLInputElement):void{
  this.flag.set(el.value)
 }
 submitform():void{
  if(this.checkoutforms.valid){
    console.log(this.checkoutforms.value)
    if(this.flag() === 'cash'){
      console.log('cash')
      this._cartService.createcashorder(this.cartid(), this.checkoutforms.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status === "success"){
            this._cartService.cartCount.set(0);
            this._router.navigate(['/allorders']);
          }
        }
      })
    }
    else{
      this._cartService.createvisaorder(this.cartid(), this.checkoutforms.value).subscribe({
        next:(res)=>{
          console.log(res)
          if(res.status === "success"){
            window.open(res.session.url,'_self')
            this._cartService.cartCount.set(0);
            this._router.navigate(['/allorders']);
          }
        }
      })
      console.log('visa')
    }
  }
 }
}
