import { Component, inject, OnInit, signal } from '@angular/core';
import { SectionTitleComponent } from "../../../../shared/ui/section-title/section-title.component";
import { ProductService } from '../../../../core/services/product/product.service';
import { Product } from '../../../../core/models/product.interface';
import { CartService } from '../../../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';
import { CardComponent } from "../../../../shared/ui/card/card.component";

@Component({
  selector: 'app-product',
  imports: [SectionTitleComponent, CardComponent],
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

}
