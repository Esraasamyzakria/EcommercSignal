import { Component, inject, PLATFORM_ID, signal } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { Cart } from '../../core/models/cart.interface';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from "@angular/router";
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-cart',
  imports: [RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  _cartService=inject(CartService)
  _platformId=inject(PLATFORM_ID)
  _toastrService=inject(ToastrService)
  productcart=signal<Cart>({}as Cart)

  ngOnInit(){
    if(isPlatformBrowser(this._platformId)){
this.getloggedcart()
    }

  
  }
  getloggedcart():void{
      this._cartService.getproductcart().subscribe((res)=>{
      this.productcart.set(res)
      console.log(res);
    })
  }
  removeProductFromCart(prodId:string):void{
    this._cartService.removeProductFromCart(prodId).subscribe((res)=>{
      console.log(res);
      this.productcart.set(res)
      this._toastrService.success('Product removed from cart successfully');
    })
  }
  update(prodId:string, quantity:number):void{
    this._cartService.updateProductInCart(prodId, quantity).subscribe((res)=>{
      console.log(res);
      this.productcart.set(res)
      this._toastrService.success('Product quantity updated successfully');
    })
  }
  clearProductInCart():void{
    this._cartService.clearProductInCart().subscribe((res)=>{
      console.log(res);
      this.productcart.set(res)
      this._toastrService.success('Cart cleared successfully');
    })
  }
}
