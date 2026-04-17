import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from "../../../../shared/ui/section-title/section-title.component";
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/models/product.interface';
import { RouterLink } from "@angular/router";
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product',
  imports: [SectionTitleComponent, RouterLink],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
})
export class ProductComponent implements OnInit {
  _productservices=inject(ProductService)
  _toastr=inject(ToastrService)
  _cartservices=inject(CartService)
  addedProducts = signal<string[]>([]);
productlist=signal<Product[]>([])
  ngOnInit(): void {
    this._productservices.getProducts().subscribe({
      next:(res)=>{
       
        this.productlist.set(res.data)
      },
      error:(err)=>{
        
      }
    })
  }
 addProductToCart(prodId: string) {
  if (localStorage.getItem('token')) {
    this._cartservices.addProductToCart(prodId).subscribe({
      next: (res) => {
        this._toastr.success(res.message, 'Success', { progressBar: true, closeButton: true });

        // 1. ضيفي الـ ID للمجموعة (عشان الأيقونة تتغير)
        this.addedProducts.update(prev => [...prev, prodId]);

        // 2. شيلي الـ ID بعد ثانيتين (عشان ترجع بلس ثانية)
        setTimeout(() => {
          this.addedProducts.update(prev => prev.filter(id => id !== prodId));
        }, 1000);
      },
    });
  } 
  else {
    this._toastr.warning('Please login first', 'Warning', { progressBar: true, closeButton: true });
  }

}
}
