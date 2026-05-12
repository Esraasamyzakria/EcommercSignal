import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/models/product.interface';
import { CartService } from '../../core/services/cart/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class DetailsComponent implements OnInit {
  _activatedRoute=inject(ActivatedRoute);
    _toastr=inject(ToastrService)
  _cartservices=inject(CartService)
  _productService=inject(ProductService);
  productDetails=signal<Product>({} as Product);
  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
      params.get('id');
      this.getProductdetails(params.get('id')!);
    })
  }
  getProductdetails(id: string):void{
  this._productService.getProductdetails(id).subscribe({
    next:(res)=>{
      this.productDetails.set(res.data)
     
    },
    error:(err)=>{
      
    }
  })
  }
    addProductToCart(prodId: string) {
  if (localStorage.getItem('token')) {
    this._cartservices.addProductToCart(prodId).subscribe({
      next: (res) => {
 if(res.status==="success"){
  this._cartservices.cartCount.set(res.numOfCartItems)
    this._toastr.success(res.message, 'Success', { progressBar: true, closeButton: true });
 }
       
      },
    });
  } 
  else {
    this._toastr.warning('Please login first', 'Warning', { progressBar: true, closeButton: true });
  }

}
}
