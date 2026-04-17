import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../../core/services/product/product.service';
import { Product } from '../../core/models/product.interface';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  _activatedRoute=inject(ActivatedRoute);
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
}
