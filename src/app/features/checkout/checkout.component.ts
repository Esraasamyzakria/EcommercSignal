import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent  implements OnInit{
  _activatedRoute=inject(ActivatedRoute);
  cartid=signal<string>('')
 ngOnInit(): void {
   this.getCartId()
 }
 getCartId(){
this._activatedRoute.paramMap.subscribe((params) => {
     this.cartid.set(params.get('id')!)
   })
 }
}
