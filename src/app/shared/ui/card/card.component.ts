import { Component, inject, input, signal } from '@angular/core';
import { Product } from '../../../core/models/product.interface';
import { RouterLink } from '@angular/router';
import { ProductService } from '../../../core/services/product/product.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../../core/services/cart/cart.service';

@Component({
  selector: 'app-card',
  imports: [RouterLink],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {
    _productservices=inject(ProductService)
  _toastr=inject(ToastrService)
  _cartservices=inject(CartService)
  addedProducts = signal<string[]>([]);
  product=input.required<Product>()




  
   addProductToCart(prodId: string) {
  if (localStorage.getItem('token')) {
    this._cartservices.addProductToCart(prodId).subscribe({
      next: (res) => {
 if(res.status==="success"){
  this._cartservices.cartCount.set(res.numOfCartItems)
    this._toastr.success(res.message, 'Success', { progressBar: true, closeButton: true });

        // 1. ضيفي الـ ID للمجموعة (عشان الأيقونة تتغير)
        this.addedProducts.update(prev => [...prev, prodId]);

        // 2. شيلي الـ ID بعد ثانيتين (عشان ترجع بلس ثانية)
        setTimeout(() => {
          this.addedProducts.update(prev => prev.filter(id => id !== prodId));
        }, 1000);
 }
       
      },
    });
  } 
  else {
    this._toastr.warning('Please login first', 'Warning', { progressBar: true, closeButton: true });
  }

}
}
